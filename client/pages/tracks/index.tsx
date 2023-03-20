import TrackList from "@/components/TrackList";
import MainLayout from "@/layouts/MainLayout";
import { useAppDispatch, useAppSelector, wrapper } from "@/store";
import { getTracks, searchTracks } from "@/store/trackSlice";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function index() {
  const router = useRouter();
  //можно использовать селектор и убрать пропс tracks
  const { 
    tracks, 
    loading,
    error} = useAppSelector(state => state.tracks);
  const [loadingState, setLoadingState] = useState(true);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const dispatch = useAppDispatch();

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(searchTracks(e.target.value));
      }, 500)
    )
  }
  
  useEffect(() => {
    setLoadingState(false);
  }, [loadingState]);
  if (error) {
    return (<MainLayout><h1>{error}</h1></MainLayout>)
  }


  if (loadingState) {
    return (<MainLayout><h1>Loading</h1></MainLayout>)
  }

  return (
    <MainLayout title={"spotify - список треков"}>
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
          <TextField 
            fullWidth
            value={query}
            onChange={search}
          />
          <TrackList tracks={tracks} />
        </Card>
      </Grid>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      await store.dispatch(getTracks()); 
      console.log("State on server", store.getState());
      return {
        props: {},
      };
    }
);