import React, { useContext, useState, useEffect, useRef } from "react";
import "../CSS/PlaybackBar.css";
import useSecsToMins from "../components/hooks/useSecsToMins";
import { NoteContext } from "../context/NoteContext";
import { ReactComponent as TriangleIcon } from "../assets/triangle-transparent-bg.svg";
import { ReactComponent as PauseIcon } from "../assets/pause-transparent-icon-v1-bg.svg";

function PlaybackBar() {
  const { trackPlaying, setTrackPlaying, waveformReference, setSelectedID } =
    useContext(NoteContext);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState(0);

  const progressBarRef = useRef(); // reference to progress bar

  const handlePlayPause = () => {
    setTrackPlaying((prev) => ({
      ...prev,
      isPlaying: !trackPlaying.isPlaying,
    }));
  };

  // increment time counter for playback when played per second
  useEffect(() => {
    if (trackPlaying.isPlaying) {
      const timer = setInterval(() => {
        setCounter((prevCount) => prevCount + 1);
      }, 250);
      return () => {
        clearInterval(timer);
      };
    }
  }, [trackPlaying]);

  // setting correct duration and progress when waveformreference changes
  useEffect(() => {
    if (waveformReference) {
      setDuration(waveformReference.current.getDuration());
      setProgress(waveformReference.current.getCurrentTime());

      //setting right hand side 3:43 of bar (duration)
      progressBarRef.current.max = waveformReference.current.getDuration();
    }
  }, [
    waveformReference?.current?.loadedmetadata,
    waveformReference?.current?.readyState,
    waveformReference,
  ]);
  // setting correct duration and progress when counter ticks
  useEffect(() => {
    if (waveformReference) {
      // setting blue play bar width
      progressBarRef.current.value = waveformReference.current.getCurrentTime();
      progressBarRef.current.style.setProperty(
        "--seek-before-width",
        `${
          (waveformReference.current.getCurrentTime() /
            waveformReference.current.getDuration()) *
          100
        }%`
      );
      setProgress(+progressBarRef.current.value);
    }
  }, [counter, progressBarRef, waveformReference]);
  // setting correct duration and progress when knobby is sliding
  const changeRange = () => {
    if (waveformReference) {
      //setting knobby
      setProgress(+progressBarRef.current.value);
      waveformReference.current.seekTo(
        +progressBarRef.current.value / +progressBarRef.current.max
      );
      // setting blue play bar width
      progressBarRef.current.value = waveformReference.current.getCurrentTime();
      progressBarRef.current.style.setProperty(
        "--seek-before-width",
        `${
          (waveformReference.current.getCurrentTime() /
            waveformReference.current.getDuration()) *
          100
        }%`
      );
      setProgress(+progressBarRef.current.value);
    }
  };
  // when title is clicked in playbackbar, displays comments
  const handleTitleClick = () => {
    setSelectedID(trackPlaying.id);
  };
  return (
    <div className="mt-10">
      <div className="bottom-0 fixed z-20 w-full h-10 bg-primary-dark p-2 m-auto">
        <div className="flex flex-row justify-center">
          <div className="text-white text-sm px-2  w-56"></div>
          <div className="flex justify-center w-[40%]">
            <div className="m-auto">
              {trackPlaying.isPlaying ? (
                <PauseIcon
                  fill="white"
                  width="15px"
                  height="15px"
                  className="mr-2 my-auto hover:cursor-pointer hover:fill-teal-600"
                  onClick={handlePlayPause}
                />
              ) : (
                <TriangleIcon
                  fill="white"
                  width="15px"
                  height="15px"
                  className="mr-2 my-auto hover:cursor-pointer hover:fill-teal-600"
                  onClick={handlePlayPause}
                />
              )}
            </div>
            <div className="text-white text-sm px-2">
              {useSecsToMins(progress)}
            </div>
            <input
              type="range"
              id="playback"
              min="0"
              max="100"
              step="0.1"
              className="progressBar"
              defaultValue={0}
              ref={progressBarRef}
              onChange={changeRange}
            />
            <div className="text-white text-sm px-2">
              {useSecsToMins(duration)}
            </div>
          </div>
          <div
            className="text-white text-xs px-2 w-64 overflow-hidden overflow-ellipsis h-5 whitespace-nowrap cursor-pointer relative top-[2px]"
            onClick={handleTitleClick}
          >
            {trackPlaying.title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaybackBar;
