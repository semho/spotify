import StepWrapper from '@/components/StepWrapper';
import TrackList from '@/components/TrackList';
import { useNotification } from '@/hooks/useNotification';
import MainLayout from '@/layouts/MainLayout';
import { useAppDispatch, useAppSelector } from '@/store';
import { attachTracksToAlbum, getAlbum } from '@/store/api';
import { getTracks } from '@/store/trackSlice';
import { IServerAlbum } from '@/types/album';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
} from '@mui/material';
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
  picture: string;
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

  const [attachTracks, setAttachTracks] = useState(album.tracks);

  const addTrack = async (
    e: React.MouseEvent<HTMLInputElement>,
    id: string,
  ) => {
    const foundTrack = tracks.filter((record) => record._id == id);
    //добавляем трек в список, если его нет. убираем, если он уже есть
    if (
      attachTracks.filter((record) => record._id == foundTrack[0]._id).length >
      0
    ) {
      setAttachTracks(
        attachTracks.filter((record) => record._id != foundTrack[0]._id),
      );
    } else {
      setAttachTracks([...attachTracks, ...foundTrack]);
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  const next = async () => {
    const updatedList = tracks.map((track) => {
      return {
        id: track._id,
        name: track.name,
        artist: track.artist,
        picture: track.picture,
      };
    });
    setTrackList(updatedList);

    if (activeStep !== 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      //логика привязки трека
      const idTracks: string[] = [];
      attachTracks.map((track) => {
        idTracks.push(track._id);
      });
      //TODO: делаем запроc на привязку id треков к альбому
      try {
        const response = await attachTracksToAlbum(album._id, idTracks);
        if (!!response.data) {
          //TODO: можно переделать на setActiveStep(0); тогда не будет перезагрузки станицы, но тогда надо будет сохранять данные в стор и из них подтягивать треки альбома
          window.location.reload();
        }
      } catch (error) {
        useNotification((error as Error).message, 'error');
      }
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
          {album.tracks.length === 0 ? (
            <h2>Треки не найдены</h2>
          ) : (
            <h2>Треки альбома</h2>
          )}
          <TrackList tracks={album.tracks} isAlbum={true} />
        </Hidden>
        <Button onClick={next}>
          {activeStep > 0 ? 'Закончить' : 'Привязать трек'}
        </Button>
      </Grid>
      <Hidden smUp={activeStep === 0}>
        <StepWrapper
          activeStep={activeStep}
          steps={['Поиск треков', 'Привязка трека']}
        >
          {activeStep === 1 && (
            <Box textAlign="center">
              <h3>Выбирите трек для привязки</h3>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  overflowY: 'scroll',
                  maxHeight: 300,
                }}
              >
                {trackList?.map((track) => (
                  <ListItem key={track.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <Image
                          src={baseUrl + track.picture}
                          width={200}
                          height={200}
                          alt=""
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <label htmlFor={track.id}>{track.name} </label>
                    <input
                      type="checkbox"
                      name={track.id}
                      id={track.id}
                      onClick={(e) => addTrack(e, track.id)}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
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
