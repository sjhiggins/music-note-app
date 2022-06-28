import React, { useEffect, useRef, useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import "../../CSS/WaveformFunc.css";
import WaveSurfer from "wavesurfer.js";

function WaveForm({ audioURL, trackPlaying, trackRef, grabWaveRef }) {
  const { setWaveformReference } = useContext(NoteContext);

  const waveformRef = useRef(null);

  // wavesurfer instance created when page loads
  useEffect(() => {
    waveformRef.current = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: waveformRef.current,
      backend: "WebAudio",
      fillParent: true,
      height: 80,
      progressColor: "#00ADB5",
      responsive: true,
      waveColor: "#EFEFEF",
      cursorColor: "transparent",
      scrollParent: false,
      hideScrollbar: true,
      mediaControls: true,
    });
    waveformRef.current.load(audioURL);
    grabWaveRef(waveformRef);
  }, []);

  // useEffect forcing context to commit to a single track playing at a time
  useEffect(() => {
    if (trackPlaying.isPlaying && trackPlaying.trackRef === trackRef) {
      waveformRef.current.play();
      setWaveformReference(waveformRef);
      waveformRef.current.setProgressColor("#00ADB5");
    } else {
      waveformRef.current.pause();
    }
    if (trackPlaying.trackRef !== trackRef) {
      waveformRef.current.setProgressColor("rgb(205, 205, 205)");
    }
  }, [trackPlaying, trackRef]);

  // fallback url incase of error
  const url = audioURL
    ? audioURL
    : "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

  return (
    <div className="waveform-container">
      <div className="wave" id="waveform" ref={waveformRef}></div>
      <audio src={url} id="track"></audio>
    </div>
  );
}

export default WaveForm;
