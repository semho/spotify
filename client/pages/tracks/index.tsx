import TrackList from "@/components/TrackList";
import MainLayout from "@/layouts/MainLayout";
import { ITrack } from "@/types/track";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function index() {
  const router = useRouter();
  const tracks: ITrack[] = [
    {
      _id: "1",
      name: "Track 1",
      artist: "Artist 1",
      text: "Some text 1",
      listens: 5,
      picture:
        "http://127.0.0.1:5000/image/3a6bfddf-fe1f-4757-ad17-91c3e9b72b06.jpg",
      audio:
        "http://127.0.0.1:5000/audio/c750951b-4a1c-405d-b815-e9aae790ea86.mp3",
    },
    {
      _id: "2",
      name: "Track 2",
      artist: "Artist 2",
      text: "Some text 2",
      listens: 2,
      picture:
        "http://127.0.0.1:5000/image/3a6bfddf-fe1f-4757-ad17-91c3e9b72b06.jpg",
      audio:
        "http://127.0.0.1:5000/audio/c750951b-4a1c-405d-b815-e9aae790ea86.mp3",
    },
    {
      _id: "3",
      name: "Track 3",
      artist: "Artist 3",
      text: "Some text 3",
      listens: 30,
      picture:
        "http://127.0.0.1:5000/image/3a6bfddf-fe1f-4757-ad17-91c3e9b72b06.jpg",
      audio:
        "http://127.0.0.1:5000/audio/c750951b-4a1c-405d-b815-e9aae790ea86.mp3",
    },
  ];
  return (
    <MainLayout>
      <Grid>
        <Card>
          <Box p={3}>
            <Grid container justifyContent="space-between">
              <h1>Список треков</h1>
              <Button onClick={() => router.push("/tracks/create")}>
                Загрузить
              </Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
}
