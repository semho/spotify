import FileUpload from "@/components/FileUpload";
import StepWrapper from "@/components/StepWrapper";
import TrackForm from "@/components/TrackForm";
import MainLayout from "@/layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export default function create() {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1)
    }
  }
  
  const back = () => {
    setActiveStep(prev => prev - 1)
  }
  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 && 
          <TrackForm />
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
