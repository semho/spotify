import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import { TrackForm } from "@/components/TrackForm";
import { useInput } from "@/hooks/useInput";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function create() {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState('');
  const [audio, setAudio] = useState('');
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const router = useRouter();


  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1)
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('picture', picture);
      formData.append('audio', audio);
      axios.post('http://localhost:5000/tracks', formData)
      .then(resp => router.push('/tracks'))
      .catch(e => console.log(e));
    }
  }
  
  const back = () => {
    setActiveStep(prev => prev - 1)
  }
  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && 
          <TrackForm name = {name} artist = {artist} text = {text}/>
        }
        {activeStep === 1 && 
          <FileUpload setFile={setPicture} accept='image/*'>
            <Button>Загрузить изображение</Button>
          </FileUpload>
        }
        {activeStep === 2 && 
          <FileUpload setFile={setAudio} accept='audio/*'>
            <Button>Загрузить аудио</Button>
          </FileUpload> 
        }
      </StepWrapper>
      <Grid container justifyContent='space-between'>
        <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
        <Button onClick={next}>Вперед</Button>
      </Grid>
    </MainLayout>
  );
}
