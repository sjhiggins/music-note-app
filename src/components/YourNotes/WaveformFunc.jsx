import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

function WaveForm({ audioURL, isPlaying }) {
  const [playing, setPlaying] = useState(false);

  const waveformRef = useRef(null);

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
    });
    waveformRef.current.load(audioURL);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      setPlaying(true);
      waveformRef.current.play();
    } else {
      setPlaying(false);
      waveformRef.current.pause();
    }
  }, [isPlaying]);

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
