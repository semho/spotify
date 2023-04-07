import { Card, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import styles from '../styles/StepWrapper.module.scss';
import QontoConnector from './QontoConnector';
import QontoStepIcon from './QontoStepIcon';

interface IStepWrapperProps {
  activeStep: number;
  children?: React.ReactNode;
  steps?: string[];
}

const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите трек'];

export default function StepWrapper({
  activeStep,
  children,
  steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите трек'],
}: IStepWrapperProps) {
  return (
    <Container>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((step, index) => (
          <Step key={index} completed={activeStep > index}>
            <StepLabel StepIconComponent={QontoStepIcon}>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justifyContent="center" className={styles.box}>
        <Card className={styles.card}>{children}</Card>
      </Grid>
    </Container>
  );
}
