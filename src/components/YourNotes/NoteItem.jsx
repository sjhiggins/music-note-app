import React, { useContext, useState, useEffect } from "react";
import { NoteContext } from "../../context/NoteContext";
import Artwork from "./Artwork";
import UtilityBar from "./UtilityBar";
import { ReactComponent as TriangleIcon } from "../../assets/triangle-transparent-bg.svg";
// import WaveForm from "./WaveFormOld";
import Waveform from "./Waveform";
import WaveformFunc from "./WaveformFunc";
import { getAuth } from "firebase/auth";

function NoteItem({ title, id, trackData, audioURL }) {
  const { setSelectedID, selectedID } = useContext(NoteContext);
  const [textHighlight, setTextHighlight] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const auth = getAuth();

  // set selected Track
  const handleNoteSelection = () => {
    setSelectedID(id);
  };

  // could need this fetch storage code later

  // const fetchStorage = async () => {
  //   const storage = getStorage();
  //   const pathReference = ref(storage, `audio/${auth.currentUser.uid}/${id}`);

  //   getDownloadURL(pathReference).then((url) => {
  //     console.log(url);
  //     setAudioSource(url);
  //     setShowWf(true);
  //   });
  // };

  // highlight text color if selected
  useEffect(() => {
    if (selectedID === id) {
      // selected title color
      setTextHighlight("text-black");
      // fetch storage
      // fetchStorage();
      console.log("selected :", selectedID);
    } else if (selectedID !== id) {
      // non selected title color
      setTextHighlight("text-gray-800");
    }
  }, [selectedID, id]);

  return (
    <div className="border-t-2 z-10 px-2 py-4 my-4 ">
      <div className="h-36 flex">
        <div className="flex flex-col flex-grow justify-between">
          <div className="mr-1 flex justify-between">
            <TriangleIcon
              fill="#00ADB5"
              width="22px"
              height="22px"
              className="mr-2 my-auto hover:cursor-pointer hover:fill-teal-600"
            />
            <div
              className={`w-full rounded-sm p-1 hover:cursor-pointer font-medium ${textHighlight}`}
              onClick={handleNoteSelection}
            >
              {title}
            </div>
          </div>
          <div className="px-2  flex flex-grow ">
            {/* <audio className="m-auto" src={audioURL} controls></audio> */}
            {/* <Waveform audioURL={audioURL} /> */}
            <WaveformFunc audioURL={audioURL} />
          </div>
          {/* {audioURL && <WaveForm audioURL={audioURL} />} */}
        </div>
        <Artwork />
      </div>
      <UtilityBar id={id} trackData={trackData} />
    </div>
  );
}

NoteItem.defaultProps = {
  title: "Title",
};

export default NoteItem;
