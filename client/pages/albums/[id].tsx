import StepWrapper from '@/components/StepWrapper';
import MainLayout from '@/layouts/MainLayout';
import { useAppDispatch, useAppSelector } from '@/store';
import { getAlbum } from '@/store/api';
import { setPlayState } from '@/store/playerSlice';
import { getTracks } from '@/store/trackSlice';
import { IServerAlbum } from '@/types/album';
import { Button, Divider, Grid, Hidden } from '@mui/material';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/TrackPage.module.scss';

interface listTrack {
  id: string;
  name: string;
  artist: string;
}

export default function TrackPage({ serverAlbum }: IServerAlbum) {
  const [album, setAlbum] = useState(serverAlbum);
  const [trackList, setTrackList] = useState<listTrack[]>();
  const [loadingState, setLoadingState] = useState(true);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.apiUrl;
  const [activeStep, setActiveStep] = useState(0);
  const { tracks } = useAppSelector((state) => state.tracks);
  const dispatch = useAppDispatch();

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  const next = async () => {
    const updatedList = tracks.map((track) => {
      return {
        id: track._id,
        name: track.name,
        artist: track.artist,
      };
    });
    setTrackList(updatedList);

    if (activeStep !== 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      //логика привязки трека
    }
  };

  useEffect(() => {
    setLoadingState(false);
    dispatch(getTracks());
  }, [dispatch, loadingState]);

  if (loadingState) {
    return (
      <MainLayout>
        <h1>Loading</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title={'spotify - ' + album.name + ' - ' + album.author}
      keywords={'музыка, артисты, альбом - ' + album.name}
    >
      <Button
        variant={'outlined'}
        style={{ fontSize: 16 }}
        onClick={() => router.push('/albums')}
      >
        к списку
      </Button>
      <Grid container className={styles.box}>
        <Image src={baseUrl + album.picture} width={200} height={200} alt="" />
        <div className={styles.info}>
          <h1>Название Альбома - {album.name}</h1>
          <h2>Автор - {album.author}</h2>
        </div>
      </Grid>
      <Divider flexItem className={styles.devider} />
      <Grid container justifyContent="space-between">
        <Hidden smUp={activeStep === 0}>
          <Button onClick={back}>Назад</Button>
        </Hidden>
        <Hidden smUp={activeStep > 0}>
          <h4>Треки альбома</h4>
        </Hidden>
        <Button onClick={next}>Привязать трек</Button>
      </Grid>
      <Hidden smUp={activeStep === 0}>
        <StepWrapper
          activeStep={activeStep}
          steps={['Поиск треков', 'Привязка трека']}
        >
          {activeStep === 0 && 'Что-то1'}
          {activeStep === 1 && (
            <ul>
              {trackList?.map((track) => {
                return <li key={track.id}>{track.name}</li>;
              })}
            </ul>
          )}
        </StepWrapper>
      </Hidden>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await getAlbum(params?.id);

  return {
    props: {
      serverAlbum: response.data,
    },
  };
};
