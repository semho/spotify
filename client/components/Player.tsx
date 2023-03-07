import { useAppDispatch, useAppSelector } from "@/store";
import { setPauseState, setPlayState } from "@/store/playerSlice";
import { ITrack } from "@/types/track";
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React from "react";
import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";

export default function Player() {
  const track: ITrack = {
    _id: "1",
    name: "Track 1",
    artist: "Artist 1",
    text: "Some text 1",
    listens: 5,
    picture:
      "http://127.0.0.1:5000/image/6721b188-d459-4a07-9c48-ec6836225c99.jpg",
    audio:
      "http://127.0.0.1:5000/audio/bd85f2e3-3074-4a11-ac57-9f0031adde4a.mp3",
    comments: [
      {
        _id: "1",
        username: "Автор 1",
        text: "text comment",
      },
    ],
  };

  const { pause, volume, duration, currentTime, active } = useAppSelector(
    (state) => state.player
  );
  const dispatch = useAppDispatch();

  const play = () => {
    if (pause) {
      dispatch(setPlayState());
    } else {
      dispatch(setPauseState());
    }
  };

  return (
    <div className={styles.player}>
      <IconButton onClick={play}>
        {pause ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Grid container direction="column" className={styles["box-name"]}>
        <div>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      <TrackProgress left={0} right={100} onChange={() => ({})} />
      <VolumeUp className={styles.volume} />
      <TrackProgress left={0} right={100} onChange={() => ({})} />
    </div>
  );
}
