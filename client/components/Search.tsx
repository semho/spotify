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

export default function Search() {
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const dispatch = useAppDispatch();

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(searchTracks(e.target.value));
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
            placeholder="Поиск треков"
            value={query}
            onChange={search}
            inputProps={{ 'aria-label': 'Поиск треков' }}
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
