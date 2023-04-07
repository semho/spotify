import FileUpload from '@/components/FileUpload';
import StepWrapper from '@/components/StepWrapper';
import { useInput } from '@/hooks/useInput';
import MainLayout from '@/layouts/MainLayout';
import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useNotification } from '@/hooks/useNotification';
import { useAppDispatch, useAppSelector } from '@/store';
import { AlbumForm } from '@/components/AlbumForm';
import { createAlbum } from '@/store/albumSlice';

export default function create() {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState('');
  const name = useInput('');
  const author = useInput('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.albums);

  const next = async () => {
    if (activeStep !== 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('author', author.value);
      formData.append('picture', picture);

      if (
        name.value.length === 0 ||
        picture.length === 0 ||
        author.value.length === 0
      ) {
        useNotification('Не все поля заполнены', 'error');
        return;
      }

      try {
        const sendAlbum = await dispatch(createAlbum(formData));
        if (!!sendAlbum.payload) {
          router.push('/albums');
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
      <StepWrapper
        activeStep={activeStep}
        steps={['Информация о альбоме', 'Загрузите обложку']}
      >
        {activeStep === 0 && <AlbumForm name={name} author={author} />}
        {activeStep === 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button sx={{ width: '100%', height: '100%' }}>
              Загрузить изображение
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
