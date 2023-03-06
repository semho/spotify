import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { IPlayerState } from "@/types/player";

// Initial state
const initialState: IPlayerState = {
  currentTime: 0,
  duration: 0,
  active: null,
  volume: 0,
  pause: true,
};

// Actual Slice
export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // Action to set the player play
    setPlayState(state, action) {
      return { ...state, pause: false };
    },
    // Action to set the player pause
    setPauseState(state, action) {
      return { ...state, pause: true };
    },
    // Action to set the player active
    setActiveState(state, action) {
      return { ...state, active: action.payload };
    },
    // Action to set the player current time
    setCurrentTimeState(state, action) {
      return { ...state, currentTime: action.payload };
    },
    // Action to set the player duration
    setDurationState(state, action) {
      return { ...state, duration: action.payload };
    },
    // Action to set the player volume
    setVolumeState(state, action) {
      return { ...state, volume: action.payload, duration: 0, currentTime: 0 };
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
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
