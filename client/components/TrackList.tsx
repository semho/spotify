import { ITrack } from "@/types/track";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TrackItem from "./TrackItem";

interface ITrackListProps {
  tracks: ITrack[];
}

export default function TrackList({ tracks }: ITrackListProps) {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </Box>
    </Grid>
  );
}
