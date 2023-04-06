import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '.';
import { ITrack, ITrackState } from '@/types/track';
import axios from 'axios';
import * as api from './api';
import { toast } from 'react-toastify';

const hydrate = createAction<AppState>(HYDRATE);

const initialState: ITrackState = {
  tracks: [],
  error: '',
  loading: false,
};

export const getTracks = createAsyncThunk(
  'track/getTracks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTracks();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Ошибка: ' + (error as Error).message);
    }
  },
);

export const searchTracks = createAsyncThunk(
  'track/searchTracks',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.searchTracks(query);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Ошибка: ' + (error as Error).message);
    }
  },
);

export const deleteTrack = createAsyncThunk(
  'track/deleteTracks',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.deleteTrack(id);
      if (!!response) {
        dispatch(removeTrack(id));
        toast('Трек удален', { type: 'success' });
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Ошибка удаления: ' + (error as Error).message);
    }
  },
);

export const addListeningTracks = createAsyncThunk(
  'track/addListeningTracks',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.addListeningTracks(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Ошибка: ' + (error as Error).message);
    }
  },
);

export const createTrack = createAsyncThunk(
  'track/createTracks',
  async (data: FormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.newTrack(data);
      if (!!response) {
        dispatch(newTrack(response.data));
        toast('Трек добавлен', { type: 'success' });
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Ошибка создания: ' + (error as Error).message);
    }
  },
);

const setLoader = (state: ITrackState) => {
  state.loading = true;
  state.error = '';
};

const setError = (state: ITrackState, { payload }: any) => {
  state.loading = false;
  state.error = payload;
};

export const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    removeTrack: (state, action: PayloadAction<string>) => {
      state.tracks = state.tracks.filter(
        (track) => track._id !== action.payload,
      );
    },
    newTrack: (state, action: PayloadAction<ITrack>) => {
      state.tracks.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      console.log('hydrate tracks', action.payload.tracks);
      return {
        ...state,
        ...action.payload.tracks,
      };
    });
    builder.addCase(getTracks.pending, setLoader);
    builder.addCase(searchTracks.pending, setLoader);
    builder.addCase(createTrack.pending, setLoader);
    builder.addCase(
      getTracks.fulfilled,
      (state, { payload }: PayloadAction<ITrack[]>) => {
        state.loading = false;
        state.error = '';
        state.tracks = payload;
      },
    );
    builder.addCase(
      searchTracks.fulfilled,
      (state, { payload }: PayloadAction<ITrack[]>) => {
        state.loading = false;
        state.error = '';
        state.tracks = payload;
      },
    );
    builder.addCase(
      createTrack.fulfilled,
      (state, { payload }: PayloadAction<ITrack[]>) => {
        state.loading = false;
        state.error = '';
        state.tracks = payload;
      },
    );
    builder.addCase(getTracks.rejected, setError);
    builder.addCase(searchTracks.rejected, setError);
    builder.addCase(addListeningTracks.rejected, setError);
    builder.addCase(createTrack.rejected, setError);
  },
});

const { removeTrack, newTrack } = trackSlice.actions;

export const selectTrackState = (state: AppState) => state.tracks;

export default trackSlice.reducer;
