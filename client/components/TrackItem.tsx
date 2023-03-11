import { useAppDispatch } from "@/store";
import { setActiveState, setPlayState } from "@/store/playerSlice";
import { ITrack } from "@/types/track";
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { Card, Grid, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/TrackItem.module.scss";

interface ITrackItemProps {
  track: ITrack;
  active?: boolean;
}

export default function TrackItem({ track, active = false }: ITrackItemProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const play = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setActiveState(track));
    dispatch(setPlayState());
  }

  return (
    <Card
      className={styles.track}
      onClick={() => router.push("/tracks/" + track._id)}
    >
      <IconButton onClick={play}>
        {active ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img width={50} height={50} src={'http://localhost:5000/' + track.picture} />
      <Grid container direction="column" className={styles["box-name"]}>
        <div>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      {active && <div>02:40 / 03:50</div>}
      <IconButton
        onClick={(e) => e.stopPropagation()}
        className={styles.delete}
      >
        <Delete />
      </IconButton>
    </Card>
  );
}
