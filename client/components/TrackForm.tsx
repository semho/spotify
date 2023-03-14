import { Grid, TextField } from '@mui/material'
import React from 'react'
import styles from "../styles/TrackForm.module.scss";

interface ITrackForm {
  [key: string]: { 
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
}

export function TrackForm({name, artist, text}: ITrackForm) {

  return (
    <>
      <Grid container direction='column' className={styles.box}>
        <TextField {...name} label={'Название трека'}></TextField>
        <TextField {...artist} label={'Имя исполнителя'}></TextField>
        <TextField {...text} label={'Слова к треку'} multiline rows={3}></TextField>
      </Grid>
    </>
  )
}
