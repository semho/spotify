import { GetServerSideProps } from 'next';
import { attachTrackToAlbum, getAlbum, getTrack } from '@/store/api';
import { IServerAlbum } from '@/types/album';
import { useEffect, useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button, Divider, Grid } from '@mui/material';
import styles from '../../styles/TrackPage.module.scss';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store';
import { getTracks } from '@/store/trackSlice';
import { useNotification } from '@/hooks/useNotification';
import TrackList from '@/components/TrackList';
import { ITrack } from '@/types/track';

export default function AlbumPage({ serverAlbum }: IServerAlbum) {
  const [album, setAlbum] = useState(serverAlbum);
  const [loadingState, setLoadingState] = useState(true);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.apiUrl;
  const { tracks } = useAppSelector((state) => state.tracks);
  const dispatch = useAppDispatch();

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

  const updateAlbumTracks = (updatedTracks: ITrack[]) => {
    setAlbum({
      ...album,
      tracks: updatedTracks,
    });
  };

  /**
   * Привязываем трек к альбому
   *
   * @param id -id текущего трека
   * @returns
   */
  const addTrack = async (id: string) => {
    try {
      const response = await attachTrackToAlbum({
        idAlbum: router.query.id,
        idTrack: id,
      });

      if (response.data == '') {
        useNotification('Этот трек уже привязан', 'warning');
        return;
      }

      updateAlbumTracks(
        album.tracks ? [...album.tracks, response.data] : [response.data],
      );

      useNotification('Трек привязан', 'success');
    } catch (error) {
      useNotification((error as Error).message, 'error');
    }
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
      <h4>Все треки</h4>
      <Divider flexItem className={styles.devider} />
      <div>
        {tracks?.map((track) => (
          <div key={track._id}>
            <span>Артист - {track.artist}</span>{' '}
            <span>Название - {track.name}</span>
            <Button
              variant={'contained'}
              className={styles.button}
              onClick={() => addTrack(track._id)}
            >
              Привязать
            </Button>
          </div>
        ))}
      </div>
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
