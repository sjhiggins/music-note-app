import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import { v4 as uuidv4 } from "uuid";

export default class WaveForm extends Component {
  state = {
    playing: false,
  };

  componentDidMount() {
    this.id = uuidv4();
    const track = document.querySelector("#track");

    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: "#waveform",
      backend: "WebAudio",
      fillParent: true,
      height: 80,
      progressColor: "#2D5BFF",
      responsive: true,
      waveColor: "#EFEFEF",
      cursorColor: "transparent",
      scrollParent: false,
    });

    this.waveform.load(track);
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause();
  };

  render() {
    const url = this.props.audioURL
      ? this.props.audioURL
      : "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

    // const url =
    //   "https://firebasestorage.googleapis.com/v0/b/music-note-229f1.appspot.com/o/audio%2Fgu8zHKMPBHY0SCszhiZ2D8Gr1aN2%2F9f306e8d-5b34-4f0f-af52-ea5a7992cb6c?alt=media&token=343dee98-4173-4023-90d6-bc7b73b9a0ff";

    console.log(url);

    return (
      <div className="waveform-container">
        <button className="play-button" onClick={this.handlePlay}>
          {!this.state.playing ? "Play" : "Pause"}
        </button>
        <div className="wave" id="waveform"></div>
        <audio src={url} id="track"></audio>
      </div>
    );
  }
}
