import { IAlbum } from '@/types/album';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AlbumItem from './AlbumItem';

export interface IAlbumListProps {
  albums: IAlbum[];
}

export default function TrackList({ albums }: IAlbumListProps) {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {albums.map((album) => (
          <AlbumItem key={album._id} album={album} />
        ))}
      </Box>
    </Grid>
  );
}
