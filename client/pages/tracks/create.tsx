import StepWrapper from "@/components/StepWrapper";
import MainLayout from "@/layouts/MainLayout";
import React from "react";

export default function create() {
  return (
    <MainLayout>
      <StepWrapper activeStep={1}>
        <h1>Загрузка трека</h1>
      </StepWrapper>
    </MainLayout>
  );
}
