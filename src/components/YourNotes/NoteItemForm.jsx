import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { NoteContext } from "../../context/NoteContext";
import noteTemplate from "./noteTemplate";
import { ReactComponent as TriangleIcon } from "../../assets/triangle-transparent-bg.svg";
import { ReactComponent as CrossIcon } from "../../assets/cross-transparent-bg.svg";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
function NoteItemForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [taskCancel, setTaskCancel] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  // disabled here means the submission of tracks is disabled, not the publish of form. Opositre. (confusing must change)
  const [disabled, setDisabled] = useState(false);
  const [trackID, setTrackID] = useState(null);
  const { setIsCreatingNote, handleTrackAdd } = useContext(NoteContext);
  const auth = getAuth();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    // error handling
    if (e.target.value.length > 1) {
      setError("");
      setDisabled(true);
    }
    if (e.target.value.length > 110) {
      setError("bg-red-200 placeholder-white");
      setDisabled(false);
    }
  };
  //function to store audio in firebase
  const storeAudio = async (audio) => {
    let trackUID = uuidv4();
    setTrackID(trackUID);
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      const storage = getStorage();
      const userUID = auth.currentUser.uid;
      const trackStorageRef = ref(storage, `audio/${userUID}/${trackUID}`);
      const uploadTask = uploadBytesResumable(trackStorageRef, audio);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressBar(Math.round(progress));
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log(snapshot.state);
          }
        },
        (error) => {
          reject(error);
          setIsLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            setAudioURL(downloadURL);
            console.log("File available at", downloadURL);

            // have code to push download url to the track info/data

            setIsLoading(false);
            setLoaded(true);
          });
        }
      );
      if (taskCancel) {
        uploadTask.cancel();
        setTaskCancel(false);
      }
    });
  };

  //creating track data
  const handlePublishTrack = async (e) => {
    if (isLoading || !disabled) {
      return;
    }
    e.preventDefault();
    let newNote = new noteTemplate(title);
    newNote = { ...newNote, id: trackID, audioURL: audioURL };
    //error handling
    if (title.trim().length < 1) {
      setError("bg-red-200 placeholder-white");
      return;
    }
    handleTrackAdd(newNote);

    //unshowing note form
    setIsCreatingNote(false);
  };

  const handleCancelNote = (event) => {
    event.preventDefault();
    setIsCreatingNote(false);
  };

  const handleAudioFileChange = (e) => {
    const audioFile = e.target.files[0];
    if (audioFile.size > 20e6) {
      alert("This is a test product, please choose a file under 20 megabytes");
      return;
    }
    storeAudio(audioFile);
    setDisabled(true);
    setTitle(e.target.files[0].name);
  };

  return (
    <>
      <div className="w-20 h-6 bg-primary-turqoise-500 rounded-t-lg text-white text-sm pt-0.5 text-center relative top-0.5">
        New Note
      </div>
      <div className="border-t-2 border-primary-turqoise z-10 px-2 py-4">
        <div className="h-48 flex flex-col justify-between">
          <div className="flex">
            <div className="flex flex-col flex-grow justify-between">
              <div className=" mr-1 flex justify-between">
                <TriangleIcon
                  fill="#b1b1b1"
                  width="22px"
                  height="22px"
                  className="mr-2 my-auto"
                />
                <input
                  type="text"
                  placeholder="Enter Song Title"
                  className={`w-full h-7 rounded-sm p-1  ${error}`}
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              {loaded ? (
                <h1 className="p-6 text-sm flex flex-grow bg-slate-100">
                  Ready to post
                </h1>
              ) : (
                <form className="p-6 text-sm flex flex-grow bg-slate-100">
                  <label
                    htmlFor="audio"
                    className={`bg-slate-200 ${
                      !disabled && "cursor-pointer"
                    } m-auto`}
                  >
                    {disabled && isLoading && "Uploading track"}
                    {!disabled && !isLoading && "Upload Audio"}
                    {disabled && !isLoading && "Ready to post"}
                    <input
                      className="m-auto hidden"
                      type="file"
                      max="1"
                      accept=".mp3,.wav"
                      id="audio"
                      onChange={handleAudioFileChange}
                      disabled={disabled}
                    />
                  </label>
                </form>
              )}
            </div>

            <div className="w-28 h-28 bg-slate-100 flex flex-col my-auto">
              <div className="m-auto">
                <CrossIcon
                  fill="#b1b1b1"
                  width="25px"
                  height="25px"
                  className="m-auto hover:cursor-pointer hover:fill-slate-500"
                />
              </div>
            </div>
          </div>
          <div className="bg-slate-300 w-full h-full ">{progressBar}</div>
          {/* <div className={`bg-black h-1 w-[${progressBar}px]`}></div> */}
          <div className="flex justify-end">
            <div
              className="text-lg hover:cursor-pointer text-gray-500 mr-4"
              onClick={handleCancelNote}
            >
              Cancel
            </div>
            <button
              className={`text-lg ${
                !disabled || isLoading
                  ? "text-gray-500"
                  : "text-primary-turqoise hover:cursor-pointer"
              } mr-4`}
              onClick={handlePublishTrack}
              disabled={!disabled || isLoading}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItemForm;
