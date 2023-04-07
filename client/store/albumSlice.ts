import { IAlbum, IAlbumState } from '@/types/album';
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '.';
import * as api from './api';
import { toast } from 'react-toastify';

const hydrate = createAction<AppState>(HYDRATE);

const initialState: IAlbumState = {
  albums: [],
  error: '',
  loading: false,
};

export const getAlbums = createAsyncThunk(
  'album/getAlbums',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAlbums();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Ошибка: ' + (error as Error).message);
    }
  },
);

export const createAlbum = createAsyncThunk(
  'album/createAlbums',
  async (data: FormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.newAlbum(data);
      if (!!response) {
        dispatch(newAlbum(response.data));
        toast('Альбом добавлен', { type: 'success' });
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Ошибка создания: ' + (error as Error).message);
    }
  },
);

export const searchAlbums = createAsyncThunk(
  'album/searchAlbums',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.searchAlbums(query);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Ошибка: ' + (error as Error).message);
    }
  },
);

export const deleteAlbum = createAsyncThunk(
  'album/deleteAlbums',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.deleteAlbum(id);
      if (!!response) {
        dispatch(removeAlbum(id));
        toast('Альбом удален', { type: 'success' });
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Ошибка удаления: ' + (error as Error).message);
    }
  },
);

const setLoader = (state: IAlbumState) => {
  state.loading = true;
  state.error = '';
};

const setError = (state: IAlbumState, { payload }: any) => {
  state.loading = false;
  state.error = payload;
};

export const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    removeAlbum: (state, action: PayloadAction<string>) => {
      state.albums = state.albums.filter(
        (album) => album._id !== action.payload,
      );
    },
    newAlbum: (state, action: PayloadAction<IAlbum>) => {
      state.albums.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      console.log('hydrate albums', action.payload.albums);
      return {
        ...state,
        ...action.payload.albums,
      };
    });
    builder.addCase(getAlbums.pending, setLoader);
    builder.addCase(createAlbum.pending, setLoader);
    builder.addCase(searchAlbums.pending, setLoader);
    builder.addCase(
      getAlbums.fulfilled,
      (state, { payload }: PayloadAction<IAlbum[]>) => {
        state.loading = false;
        state.error = '';
        state.albums = payload;
      },
    );
    builder.addCase(
      createAlbum.fulfilled,
      (state, { payload }: PayloadAction<IAlbum[]>) => {
        state.loading = false;
        state.error = '';
        state.albums = payload;
      },
    );
    builder.addCase(
      searchAlbums.fulfilled,
      (state, { payload }: PayloadAction<IAlbum[]>) => {
        state.loading = false;
        state.error = '';
        state.albums = payload;
      },
    );
    builder.addCase(getAlbums.rejected, setError);
    builder.addCase(createAlbum.rejected, setError);
    builder.addCase(searchAlbums.rejected, setError);
  },
});

const { removeAlbum, newAlbum } = albumSlice.actions;

export const selectAlbumState = (state: AppState) => state.tracks;

export default albumSlice.reducer;
