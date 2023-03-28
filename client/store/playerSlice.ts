import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IPlayerState } from '@/types/player';
import { AppState } from '.';
import { ITrack } from '@/types/track';

const hydrate = createAction<AppState>(HYDRATE);

// Initial state
const initialState: IPlayerState = {
  currentTime: 0,
  duration: 0,
  active: null,
  volume: 50,
  pause: true,
};

// Actual Slice
export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // Action to set the player play
    setPlayState(state) {
      state.pause = false;
    },
    // Action to set the player pause
    setPauseState(state) {
      state.pause = true;
    },
    // Action to set the player active
    setActiveState(state, action: PayloadAction<ITrack>) {
      return { ...state, active: action.payload };
    },
    // Action to set the player current time
    setCurrentTimeState(state, action: PayloadAction<number>) {
      return { ...state, currentTime: action.payload };
    },
    // Action to set the player duration
    setDurationState(state, action: PayloadAction<number>) {
      return { ...state, duration: action.payload };
    },
    // Action to set the player volume
    setVolumeState(state, action: PayloadAction<number>) {
      return {
        ...state,
        volume: action.payload,
      };
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  // extraReducers: {
  //   [HYDRATE]: (state, action) => {
  //     return {
  //       ...state,
  //       ...action.payload,
  //     };
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      console.log('hydrate player', action.payload.player);
      return {
        ...state,
        ...action.payload.player,
      };
    });
  },
});

export const {
  setPlayState,
  setPauseState,
  setActiveState,
  setCurrentTimeState,
  setDurationState,
  setVolumeState,
} = playerSlice.actions;

export const selectPlayerState = (state: AppState) => state.player;

export default playerSlice.reducer;
