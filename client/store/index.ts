import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { playerSlice } from "./playerSlice";
import { trackSlice } from "./trackSlice";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    [playerSlice.name]: playerSlice.reducer,
    [trackSlice.name]: trackSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: true,
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

/**
 * для удобства преобразуем dispatch и selector
 */

export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore);

// export type NextThunkDispatch = ThunkDispatch<AppState, void, AnyAction>;
