import { ITrack } from '@/types/track';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import TrackItem from './TrackItem';

export interface ITrackListProps {
  tracks: ITrack[];
  isAlbum?: boolean;
}

export default function TrackList({
  tracks,
  isAlbum = false,
}: ITrackListProps) {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem key={track._id} track={track} isAlbum={isAlbum} />
        ))}
      </Box>
    </Grid>
  );
}
