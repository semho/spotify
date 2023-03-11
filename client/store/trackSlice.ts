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

export const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      console.log("hydrate tracks");
      return {
        ...state,
        ...action.payload.tracks,
      };
    });
    builder.addCase(getTracks.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      getTracks.fulfilled,
      (state, { payload }: PayloadAction<ITrack[]>) => {
        state.loading = false;
        state.error = "";
        state.tracks = payload;
      }
    );
    builder.addCase(getTracks.rejected, (state, { payload }: any) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const selectTrackState = (state: AppState) => state.tracks;

export default trackSlice.reducer;
