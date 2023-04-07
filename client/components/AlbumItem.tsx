import { useAppDispatch } from '@/store';
import { IAlbum } from '@/types/album';
import { Delete } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import getConfig from 'next/config';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/TrackItem.module.scss';

interface IAlbumItemProps {
  album: IAlbum;
}

export default function AlbumItem({ album }: IAlbumItemProps) {
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.apiUrl;

  const router = useRouter();
  const dispatch = useAppDispatch();

  const deleteAlbumById = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    // dispatch(deleteAlbum(album._id));
  };

  return (
    <Card
      className={styles.track}
      onClick={() => router.push('/albums/' + album._id)}
    >
      <Image width={50} height={50} src={baseUrl + album.picture} alt="" />
      <Grid container direction="column" className={styles['box-name']}>
        <div>{album.name}</div>
        <div className={styles.artist}>{album.author}</div>
      </Grid>
      <IconButton onClick={deleteAlbumById} className={styles.delete}>
        <Delete />
      </IconButton>
    </Card>
  );
}
