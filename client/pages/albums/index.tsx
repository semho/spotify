import MainLayout from '@/layouts/MainLayout';
import { useAppSelector, wrapper } from '@/store';
import { getAlbums } from '@/store/albumSlice';
import Search from '@/components/Search';
import { Grid, Card, Box, Button } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AlbumList from '@/components/AlbumList';

export default function index() {
  const router = useRouter();
  const { albums, loading, error } = useAppSelector((state) => state.albums);
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
    <MainLayout title={'spotify - список альбомов'}>
      <Grid>
        <Card>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список альбомов</h1>
              <Button onClick={() => router.push('/albums/create')}>
                Создать альбом
              </Button>
            </Grid>
          </Box>
          <Search find="альбомов" />
          {albums.length === 0 && (
            <Box textAlign="center">
              <h2>Альбомы не найдены</h2>
            </Box>
          )}
          <AlbumList albums={albums} />
        </Card>
      </Grid>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async ({ params }) => {
    await store.dispatch(getAlbums());
    console.log('State on server', store.getState());
    return {
      props: {},
    };
  });
