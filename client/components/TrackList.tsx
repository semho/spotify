import { ITrack } from '@/types/track';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import TrackItem from './TrackItem';

export interface ITrackListProps {
  tracks: ITrack[];
  updateAlbumTracks?: (updatedTracks: ITrack[]) => void;
  isAlbum?: boolean;
}

export default function TrackList({
  tracks,
  updateAlbumTracks,
  isAlbum = false,
}: ITrackListProps) {
  const handleDeleteTrack = (track: ITrack) => {
    if (!updateAlbumTracks) return;
    const updatedTracks = tracks.filter((t) => t._id !== track._id);
    updateAlbumTracks(updatedTracks);
  };

  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItem
            key={track._id}
            track={track}
            isAlbum={isAlbum}
            onDeleteTrack={handleDeleteTrack}
          />
        ))}
      </Box>
    </Grid>
  );
}
