import { useAppDispatch, useAppSelector } from '@/store';
import { setActiveState, setPlayState } from '@/store/playerSlice';
import { deleteTrack } from '@/store/trackSlice';
import { ITrack } from '@/types/track';
import timeFormat from '@/utils/timeFormat';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/TrackItem.module.scss';

interface ITrackItemProps {
  track: ITrack;
}

export default function TrackItem({ track }: ITrackItemProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const statePlayer = useAppSelector((state) => state.player);
  const [trackPlay, setTrackPlay] = useState(false);
  const [trackDuration, setTrackDuration] = useState('0');
  const play = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setActiveState(track));
    dispatch(setPlayState());
  };

  const deleteTrackById = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation;
    dispatch(deleteTrack(track._id));
  };

  const setAudio = useCallback(() => {
    const audio: HTMLAudioElement = new Audio();
    audio.src = 'http://localhost:5000/' + track.audio;
    audio.onloadedmetadata = async () => {
      setTrackDuration(timeFormat(audio.duration));
    };
  }, [track.audio]);

  useEffect(() => {
    setAudio();

    setTrackPlay(false);
    if (statePlayer.active?._id === track._id) {
      setTrackPlay(true);
      console.log(track);
    }
  }, [setAudio, statePlayer.active?._id, track]);

  return (
    <Card
      className={styles.track}
      onClick={() => router.push('/tracks/' + track._id)}
    >
      <IconButton onClick={play}>
        {!trackPlay ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Image
        width={50}
        height={50}
        src={'http://localhost:5000/' + track.picture}
        alt=""
      />
      <Grid container direction="column" className={styles['box-name']}>
        <div>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      {trackDuration && <div>{trackDuration}</div>}
      <IconButton onClick={deleteTrackById} className={styles.delete}>
        <Delete />
      </IconButton>
    </Card>
  );
}
