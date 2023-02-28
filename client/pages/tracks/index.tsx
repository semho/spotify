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
        "http://127.0.0.1:5000/image/6721b188-d459-4a07-9c48-ec6836225c99.jpg",
      audio:
        "http://127.0.0.1:5000/audio/bd85f2e3-3074-4a11-ac57-9f0031adde4a.mp3",
    },
    {
      _id: "2",
      name: "Track 2",
      artist: "Artist 2",
      text: "Some text 2",
      listens: 2,
      picture:
        "http://127.0.0.1:5000/image/eb567fa1-fd6b-4778-bf97-1cbbd2f1ccd0.png",
      audio:
        "http://127.0.0.1:5000/audio/bbb78269-6e1a-4596-8865-2e7f0f9e41ad.mp3",
    },
    {
      _id: "3",
      name: "Track 3",
      artist: "Artist 3",
      text: "Some text 3",
      listens: 30,
      picture:
        "http://127.0.0.1:5000/image/6721b188-d459-4a07-9c48-ec6836225c99.jpg",
      audio:
        "http://127.0.0.1:5000/audio/bd85f2e3-3074-4a11-ac57-9f0031adde4a.mp3",
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
