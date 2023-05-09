import { ITrack } from '@/types/track';
import { Add } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import getConfig from 'next/config';
import Image from 'next/image';
import React from 'react';
import styles from '../styles/TrackItem.module.scss';

interface ITrackItemProps {
  track: ITrack;
  onAddTrack: (track: ITrack) => void;
}

export default function TrackItemForAlbum({
  track,
  onAddTrack,
}: ITrackItemProps) {
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.apiUrl;

  return (
    <Card className={styles.track}>
      <Image width={50} height={50} src={baseUrl + track.picture} alt="" />
      <Grid container direction="column" className={styles['box-name']}>
        <div>{track.name}</div>
        <div className={styles.artist}>{track.artist}</div>
      </Grid>
      <IconButton
        onClick={() => {
          onAddTrack(track);
        }}
        className={styles.delete}
      >
        <Add />
      </IconButton>
    </Card>
  );
}
