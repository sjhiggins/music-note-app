import React, { useState, useRef, useContext, useEffect } from "react";
import { NoteContext } from "../../context/NoteContext";
import { FaVolumeUp } from "react-icons/fa";
import "../../CSS/VolumeBar.css";

function VoumeBar({ displayVolume, showHide, hideVolume }) {
  const { waveformReference, setGlobalVolume } = useContext(NoteContext);
  const [volume, setVolume] = useState(1);

  const volumeRef = useRef(); // reference to volume bar

  const changeRange = (x) => {
    setVolume(x.target.value);
    volumeRef.current.style.setProperty(
      "--seek-before-width",
      `${volume * 100}%`
    );
    if (waveformReference) {
      waveformReference.current.setVolume(x.target.value);
    }
    setGlobalVolume(x.target.value);
  };

  useEffect(() => {
    volumeRef.current.style.setProperty(
      "--seek-before-width",
      `${volume * 100}%`
    );
  }, []);

  const muteMax = () => {
    if (volume > 0) {
      setVolume(0);
      waveformReference.current.setVolume(0);
      setGlobalVolume(0);
      volumeRef.current.style.setProperty("--seek-before-width", `0%`);
    } else {
      setVolume(1);
      waveformReference.current.setVolume(1);
      setGlobalVolume(1);
      volumeRef.current.style.setProperty("--seek-before-width", `100%`);
    }
  };
  return (
    <div>
      <div
        className="px-2 relative top-[1.5px] hover:cursor-pointer"
        onMouseOver={displayVolume}
        onClick={muteMax}
      >
        <FaVolumeUp fill="white" width="15px" height="15px" />
      </div>
      <div className={`slider-container ${showHide}`} onMouseLeave={hideVolume}>
        <input
          className="vertical-slider"
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.02"
          orient="vertical"
          onChange={changeRange}
          value={volume}
          ref={volumeRef}
        ></input>
      </div>
    </div>
  );
}

export default VoumeBar;
