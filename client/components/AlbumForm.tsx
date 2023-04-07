import { Grid, TextField } from '@mui/material';
import React from 'react';
import styles from '../styles/TrackForm.module.scss';

interface IAlbumForm {
  [key: string]: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export function AlbumForm({ name, author }: IAlbumForm) {
  return (
    <>
      <Grid container direction="column" className={styles.box}>
        <TextField {...name} label={'Название альбома'}></TextField>
        <TextField {...author} label={'Имя автора'}></TextField>
      </Grid>
    </>
  );
}
