import { Grid, TextField } from '@mui/material'
import React from 'react'
import styles from "../styles/TrackForm.module.scss";

export default function TrackForm() {
  return (
    <>
      <Grid container direction='column' className={styles.box}>
        <TextField label={'Название трека'}></TextField>
        <TextField label={'Имя исполнителя'}></TextField>
        <TextField label={'Слока к треку'} multiline rows={3}></TextField>
      </Grid>
    </>
  )
}
