import TrackList from '@/components/TrackList';
import MainLayout from '@/layouts/MainLayout';
import { useAppSelector, wrapper } from '@/store';
import { getTracks } from '@/store/trackSlice';
import { Box, Button, Card, Grid } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Search from '@/components/Search';

export default function index() {
  const router = useRouter();
  const { tracks, loading, error } = useAppSelector((state) => state.tracks);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    setLoadingState(false);
  }, [loadingState]);
  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  if (loadingState) {
    return (
      <MainLayout>
        <h1>Loading</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={'spotify - список треков'}>
      <Grid>
        <Card>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push('/tracks/create')}>
                Загрузить
              </Button>
            </Grid>
          </Box>
          <Search />
          {tracks.length === 0 && (
            <Box textAlign="center">Треки не найдены</Box>
          )}
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    await store.dispatch(getTracks());
    console.log('State on server', store.getState());
    return {
      props: {},
    };
  });
