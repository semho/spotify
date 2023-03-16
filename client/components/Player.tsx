import { useAppDispatch, useAppSelector } from "@/store";
import { setCurrentTimeState, setDurationState, setPauseState, setPlayState, setVolumeState } from "@/store/playerSlice";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";

let audio: HTMLAudioElement;

export default function Player() {

  const { pause, volume, duration, currentTime, active } = useAppSelector(
    (state) => state.player
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } 
    else {
      setAudio();
      play();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        dispatch(setDurationState(Math.ceil(audio.duration)));
      }
      audio.ontimeupdate = () => {
        dispatch(setCurrentTimeState(Math.ceil(audio.currentTime)));
      }
    }
  }

  const play = () => {
    if (pause) {
      dispatch(setPlayState());
      const playPromise = audio.play();
      if (playPromise !== undefined) {
          playPromise.then(_ => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
          });
      }
    } else {
      dispatch(setPauseState());
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    dispatch(setVolumeState(Number(e.target.value)));
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    dispatch(setCurrentTimeState(Number(e.target.value)));
  }

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <PlayArrow /> : <Pause /> }
      </IconButton>
      <Grid container direction="column" className={styles["box-name"]}>
        <div>{active?.name}</div>
        <div className={styles.artist}>{active?.artist}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
      <VolumeUp className={styles.volume} />
      <TrackProgress left={volume} right={100} onChange={changeVolume} />
    </div>
  );
}
