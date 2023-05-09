import { useNotification } from '@/hooks/useNotification';
import { attachTrackToAlbum } from '@/store/api';
import { ITrack } from '@/types/track';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import React from 'react';
import TrackItemForAlbum from './TrackItemForAlbum';

export interface ITrackListProps {
  tracks: ITrack[];
  albumTracks: ITrack[];
  updateAlbumTracks?: (updatedTracks: ITrack[]) => void;
}

export default function TrackListForAlbum({
  tracks,
  albumTracks,
  updateAlbumTracks,
}: ITrackListProps) {
  const router = useRouter();

  /**
   * Привязываем трек к альбому
   * @param track
   * @returns
   */
  const addTrack = async (track: ITrack) => {
    if (!updateAlbumTracks) return;
    try {
      const response = await attachTrackToAlbum({
        idAlbum: router.query.id,
        idTrack: track._id,
      });

      if (response.data == '') {
        useNotification('Этот трек уже привязан', 'warning');
        return;
      }

      updateAlbumTracks(
        albumTracks ? [...albumTracks, response.data] : [response.data],
      );

      useNotification('Трек привязан', 'success');
    } catch (error) {
      useNotification((error as Error).message, 'error');
    }
  };

  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track) => (
          <TrackItemForAlbum
            key={track._id}
            track={track}
            onAddTrack={addTrack}
          />
        ))}
      </Box>
    </Grid>
  );
}
