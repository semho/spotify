import { GetServerSideProps } from 'next';
import { getAlbum } from '@/store/api';
import { IServerAlbum } from '@/types/album';
import { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button, Divider, Grid, Collapse, Box } from '@mui/material';
import styles from '../../styles/TrackPage.module.scss';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store';
import { getTracks } from '@/store/trackSlice';
import TrackList from '@/components/TrackList';
import { ITrack } from '@/types/track';
import TrackListForAlbum from '@/components/TrackListForAlbum';

export default function AlbumPage({ serverAlbum }: IServerAlbum) {
  const [album, setAlbum] = useState(serverAlbum);
  const [loadingState, setLoadingState] = useState(true);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.apiUrl;
  const { tracks } = useAppSelector((state) => state.tracks);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /**
   * функция для обновления состояния стейта привязанных треков к альбому
   * ее прокидываем в дочерние компоненты для возможности отвязки/привязки трека от/к альбома
   * @param updatedTracks
   */
  const updateAlbumTracks = (updatedTracks: ITrack[]) => {
    setAlbum({
      ...album,
      tracks: updatedTracks,
    });
  };

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
        {album.tracks.length === 0 ? (
          <h2>Треки не найдены</h2>
        ) : (
          <h2>Треки альбома</h2>
        )}
        <TrackList
          tracks={album.tracks}
          updateAlbumTracks={updateAlbumTracks}
        />
      </Grid>
      <Divider flexItem className={styles.devider} />
      <h4>Треки для добавления в альбом</h4>
      <Box textAlign="center" sx={{ marginBottom: '20px' }}>
        <Button onClick={handleExpandClick} variant={'outlined'}>
          Показать/скрыть
        </Button>
      </Box>
      <Divider flexItem className={styles.devider} />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Grid container justifyContent="space-between">
          {tracks?.length === 0 ? (
            <h4>Треки не найдены</h4>
          ) : (
            <TrackListForAlbum
              tracks={tracks}
              updateAlbumTracks={updateAlbumTracks}
              albumTracks={album.tracks}
            />
          )}
        </Grid>
      </Collapse>
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
