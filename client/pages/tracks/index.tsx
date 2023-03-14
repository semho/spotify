import TrackList, { ITrackListProps } from "@/components/TrackList";
import MainLayout from "@/layouts/MainLayout";
import { useAppSelector, wrapper } from "@/store";
import { getTracks } from "@/store/trackSlice";
import { ITrack, ITrackState } from "@/types/track";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";

export default function index({tracks}: ITrackListProps) {
  const router = useRouter();
  //можно использовать селектор и убрать пропс tracks
  // const { tracks, error, loading} = useAppSelector(state => state.tracks);
  const [loadingSSP, setLoadingSSP] = useState(true);
  
  useEffect(() => {
    setLoadingSSP(false);
  }, [loadingSSP]);
  // if (error) {
  //   return (<MainLayout><h1>{error}</h1></MainLayout>)
  // }


  if (loadingSSP) {
    return (<h1>Loading</h1>)
  }

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getTracks()); 
      console.log("State on server", store.getState());
      return {
        props: {
          tracks: store.getState().tracks.tracks,
        },
      };
    }
);