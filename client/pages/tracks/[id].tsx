import MainLayout from "@/layouts/MainLayout";
import { ITrack } from "@/types/track";
import { Button, Divider, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/TrackPage.module.scss";

export default function TrackPage() {
  const track: ITrack = {
    _id: "1",
    name: "Track 1",
    artist: "Artist 1",
    text: "Some text 1",
    listens: 5,
    picture:
      "http://127.0.0.1:5000/image/6721b188-d459-4a07-9c48-ec6836225c99.jpg",
    audio:
      "http://127.0.0.1:5000/audio/bd85f2e3-3074-4a11-ac57-9f0031adde4a.mp3",
    comments: [
      {
        _id: "1",
        username: "Автор 1",
        text: "text comment",
      },
    ],
  };
  const router = useRouter();

  return (
    <MainLayout>
      <Button
        variant={"outlined"}
        style={{ fontSize: 16 }}
        onClick={() => router.push("/tracks")}
      >
        к списку
      </Button>
      <Grid container className={styles.box}>
        <img src={track.picture} width={200} height={200} />
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
      <Grid container className={styles["second-box"]}>
        <TextField label="Ваше Имя" fullWidth />
        <TextField label="Комментарий" fullWidth multiline rows={4} />
        <Button variant={"contained"} className={styles.button}>
          Отправить
        </Button>
      </Grid>
      <Divider flexItem className={styles.devider} />
      <div>
        {track.comments?.map((comment) => (
          <div>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}
