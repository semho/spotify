import { useAppDispatch, useAppSelector } from '@/store';
import { setActiveState, setPlayState } from '@/store/playerSlice';
import { deleteTrack } from '@/store/trackSlice';
import { ITrack } from '@/types/track';
import timeFormat from '@/utils/timeFormat';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import getConfig from 'next/config';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/TrackItem.module.scss';

interface ITrackItemProps {
  track: ITrack;
  isAlbum?: boolean;
}

export default function TrackItem({ track, isAlbum = false }: ITrackItemProps) {
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.apiUrl;

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
    e.stopPropagation();

    if (isAlbum) {
      console.log(router.query);
    } else {
      dispatch(deleteTrack(track._id));
    }
  };

  const setAudio = useCallback(() => {
    const audio: HTMLAudioElement = new Audio();
    audio.src = baseUrl + track.audio;
    audio.onloadedmetadata = async () => {
      setTrackDuration(timeFormat(audio.duration));
    };
  }, [baseUrl, track.audio]);

  useEffect(() => {
    setAudio();

    setTrackPlay(false);
    if (statePlayer.active?._id === track._id) {
      setTrackPlay(true);
    }
  }, [baseUrl, setAudio, statePlayer.active?._id, track]);

  return (
    <Card
      className={styles.track}
      onClick={() => router.push('/tracks/' + track._id)}
    >
      <IconButton onClick={play}>
        {!trackPlay ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Image width={50} height={50} src={baseUrl + track.picture} alt="" />
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
