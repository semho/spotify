import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useAppDispatch } from '@/store';
import { searchTracks } from '@/store/trackSlice';
import { searchAlbums } from '@/store/albumSlice';

type TSearch = {
  find?: 'треков' | 'альбомов';
};

export default function Search({ find = 'треков' }: TSearch) {
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const dispatch = useAppDispatch();
  const findString = 'Поиск ' + find + ' по названию';

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        if (find == 'треков') {
          await dispatch(searchTracks(e.target.value));
        } else {
          await dispatch(searchAlbums(e.target.value));
        }
      }, 500),
    );
  };
  return (
    <Grid container>
      <Box
        p={2}
        sx={{
          margin: '0 auto',
        }}
      >
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '70vw',
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={findString}
            value={query}
            onChange={search}
            inputProps={{ 'aria-label': findString }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Grid>
  );
}
