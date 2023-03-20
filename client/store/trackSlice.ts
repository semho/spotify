import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from ".";
import { ITrack, ITrackState } from "@/types/track";
import axios from "axios";

const hydrate = createAction<AppState>(HYDRATE);

const initialState: ITrackState = {
  tracks: [],
  error: "",
  loading: false,
};

export const getTracks = createAsyncThunk(
  "track/getTracks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/tracks");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Ошибка: " + (error as Error).message);
    }
  }
);

export const searchTracks = createAsyncThunk(
  "track/searchTracks",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tracks/search?query=" + query
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Ошибка: " + (error as Error).message);
    }
  }
);

export const deleteTrack = createAsyncThunk(
  "track/deleteTracks",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete("http://localhost:5000/tracks/" + id);
      if (!!response) {
        dispatch(removeTrack(id));
      }

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Ошибка удаления: " + (error as Error).message);
    }
  }
);

const setLoader = (state: ITrackState) => {
  state.loading = true;
  state.error = "";
};

const setError = (state: ITrackState, { payload }: any) => {
  state.loading = false;
  state.error = payload;
};

export const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    removeTrack: (state, action: PayloadAction<string>) => {
      state.tracks = state.tracks.filter(
        (track) => track._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      console.log("hydrate tracks", action.payload.tracks);
      return {
        ...state,
        ...action.payload.tracks,
      };
    });
    builder.addCase(getTracks.pending, setLoader);
    builder.addCase(searchTracks.pending, setLoader);
    builder.addCase(
      getTracks.fulfilled,
      (state, { payload }: PayloadAction<ITrack[]>) => {
        state.loading = false;
        state.error = "";
        state.tracks = payload;
      }
    );
    builder.addCase(
      searchTracks.fulfilled,
      (state, { payload }: PayloadAction<ITrack[]>) => {
        state.loading = false;
        state.error = "";
        state.tracks = payload;
      }
    );
    builder.addCase(getTracks.rejected, setError);
    builder.addCase(searchTracks.rejected, setError);
  },
});

const { removeTrack } = trackSlice.actions;

export const selectTrackState = (state: AppState) => state.tracks;

export default trackSlice.reducer;
