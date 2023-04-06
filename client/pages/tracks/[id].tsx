import { useInput } from '@/hooks/useInput';
import { useNotification } from '@/hooks/useNotification';
import MainLayout from '@/layouts/MainLayout';
import { getTrack, newComment } from '@/store/api';
import { IServerTrack } from '@/types/track';
import { Button, Divider, Grid, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/TrackPage.module.scss';

export default function TrackPage({ serverTrack }: IServerTrack) {
  const [track, setTrack] = useState(serverTrack);
  const [loadingState, setLoadingState] = useState(true);
  const router = useRouter();
  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
      const response = await newComment({
        username: username.value,
        text: text.value,
        trackId: track._id,
      });

      setTrack({
        ...track,
        comments: track.comments
          ? [...track.comments, response.data]
          : [response.data],
      });
      useNotification('Комментарий добавлен', 'success');
    } catch (error) {
      useNotification((error as Error).message, 'error');
    }
  };

  useEffect(() => {
    setLoadingState(false);
  }, [loadingState]);

  if (loadingState) {
    return (
      <MainLayout>
        <h1>Loading</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title={'spotify - ' + track.name + ' - ' + track.artist}
      keywords={'музыка, артисты, трек - ' + track.name}
    >
      <Button
        variant={'outlined'}
        style={{ fontSize: 16 }}
        onClick={() => router.push('/tracks')}
      >
        к списку
      </Button>
      <Grid container className={styles.box}>
        <Image
          src={'http://localhost:5000/' + track.picture}
          width={200}
          height={200}
          alt=""
        />
        <div className={styles.info}>
          <h1>Название трека - {track.name}</h1>
          <h2>Исполнитель - {track.artist}</h2>
          <h2>Прослушиваний - {track.listens}</h2>
        </div>
      </Grid>
      <h2>Текст трека</h2>
      <p>{track.text}</p>
      <Divider flexItem className={styles.devider} />
      <h4>Комментарии</h4>
      <Grid container className={styles['second-box']}>
        <TextField label="Ваше Имя" fullWidth {...username} />
        <TextField label="Комментарий" fullWidth multiline rows={4} {...text} />
        <Button
          variant={'contained'}
          className={styles.button}
          onClick={addComment}
        >
          Отправить
        </Button>
      </Grid>
      <Divider flexItem className={styles.devider} />
      <div>
        {track.comments?.map((comment) => (
          <div key={comment._id}>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await getTrack(params?.id);

  return {
    props: {
      serverTrack: response.data,
    },
  };
};
