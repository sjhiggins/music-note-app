import React, { useContext, useState, useEffect } from "react";
import { NoteContext } from "../../context/NoteContext";
import UtilityBar from "./UtilityBar";
import { ReactComponent as TriangleIcon } from "../../assets/triangle-transparent-bg.svg";
import { ReactComponent as PauseIcon } from "../../assets/pause-transparent-icon-v1-bg.svg";
import WaveformFunc from "./WaveformFunc";

function NoteItem({ title, id, trackData, audioURL }) {
  const {
    setSelectedID,
    selectedID,
    setTrackPlaying,
    trackPlaying,
    setWaveformReference,
  } = useContext(NoteContext);
  const [textHighlight, setTextHighlight] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [aURL, setAURL] = useState(audioURL);
  const docRef = trackData.docRef;

  const grabWaveRef = (ref) => {
    setWaveformReference(ref);
  };
  // set selected Track
  const handleNoteSelection = () => {
    setSelectedID(id);
  };
  // highlight text color if selected
  useEffect(() => {
    if (selectedID === id) {
      // selected title color
      setTextHighlight("text-black");
    } else if (selectedID !== id) {
      // non selected title color
      setTextHighlight("text-gray-800");
    }
  }, [selectedID, id]);
  // backupUrl incase of error
  useEffect(() => {
    if (!audioURL) {
      setAURL("https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3");
    }
  }, []);

  // handle switching data in context for playing track
  const handlePlay = () => {
    setTrackPlaying((prev) => ({
      ...prev,
      isPlaying: !isPlaying,
      trackRef: docRef,
      title: title,
      id: id,
    }));
    setSelectedID(id);
  };

  // handle if showing play or pause button for each track
  useEffect(() => {
    if (trackPlaying.trackRef === docRef && trackPlaying.isPlaying === true) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [trackPlaying, docRef]);

  return (
    <div className="border-t-2 z-10 px-2 py-4 my-4 ">
      <div className="h-36 flex">
        <div className="flex flex-col flex-grow justify-between">
          <div className="mr-1 flex justify-between">
            {isPlaying ? (
              <PauseIcon
                fill="#00ADB5"
                width="22px"
                height="22px"
                className="mr-2 my-auto hover:cursor-pointer hover:fill-teal-600"
                onClick={handlePlay}
              />
            ) : (
              <TriangleIcon
                fill="#00ADB5"
                width="22px"
                height="22px"
                className="mr-2 my-auto hover:cursor-pointer hover:fill-teal-600"
                onClick={handlePlay}
              />
            )}
            <div
              className={`w-full rounded-sm p-1 hover:cursor-pointer font-medium ${textHighlight}`}
              onClick={handleNoteSelection}
            >
              {title}
            </div>
          </div>
          <div className="px-2   ">
            <WaveformFunc
              audioURL={aURL}
              isPlaying={isPlaying}
              trackPlaying={trackPlaying}
              trackRef={docRef}
              grabWaveRef={grabWaveRef}
            />
          </div>
        </div>
        {/* <Artwork /> */}
      </div>
      <UtilityBar id={id} trackData={trackData} />
    </div>
  );
}

NoteItem.defaultProps = {
  title: "Title",
};

export default NoteItem;
