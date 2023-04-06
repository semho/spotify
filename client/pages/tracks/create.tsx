import FileUpload from '@/components/FileUpload';
import StepWrapper from '@/components/StepWrapper';
import { TrackForm } from '@/components/TrackForm';
import { useInput } from '@/hooks/useInput';
import MainLayout from '@/layouts/MainLayout';
import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useNotification } from '@/hooks/useNotification';
import { useAppDispatch, useAppSelector } from '@/store';
import { createTrack } from '@/store/trackSlice';

export default function create() {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState('');
  const [audio, setAudio] = useState('');
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.tracks);

  const next = async () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('picture', picture);
      formData.append('audio', audio);

      if (
        name.value.length === 0 ||
        picture.length === 0 ||
        audio.length === 0
      ) {
        useNotification('Не все поля заполнены', 'error');
        return;
      }

      try {
        const sendTrack = await dispatch(createTrack(formData));
        if (!!sendTrack.payload) {
          router.push('/tracks');
        }
      } catch (error) {
        useNotification((error as Error).message, 'error');
      }
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  if (loading) {
    return (
      <MainLayout>
        <h1>Loading</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && (
          <TrackForm name={name} artist={artist} text={text} />
        )}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button sx={{ width: '100%', height: '100%' }}>
              Загрузить изображение
            </Button>
          </FileUpload>
        )}
        {activeStep === 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button sx={{ width: '100%', height: '100%' }}>
              Загрузить аудио
            </Button>
          </FileUpload>
        )}
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>
          Назад
        </Button>
        <Button onClick={next}>Вперед</Button>
      </Grid>
    </MainLayout>
  );
}
