import React, { useState, useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

function WaveForm({ audioURL }) {
  const [playing, setPlaying] = useState(false);

  //   componentDidMount() {
  // const track = document.querySelector("#track");

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

  //     this.waveform.load(track);
  //   }

  const handlePlay = () => {
    // setPlaying(!playing);
    if (!waveformRef.current.isPlaying()) {
      waveformRef.current.play();
      setPlaying(true);
    } else {
      waveformRef.current.pause();
      setPlaying(false);
    }
  };

  const url = audioURL
    ? audioURL
    : "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

  console.log(url);

  return (
    <div className="waveform-container">
      <button className="play-button" onClick={handlePlay}>
        {!playing ? "Play" : "Pause"}
      </button>
      <div className="wave" id="waveform" ref={waveformRef}></div>
      <audio src={url} id="track"></audio>
    </div>
  );
}

export default WaveForm;
