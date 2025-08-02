import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import localeReducer from "./localeSlice"
import sessionReducer from "./sessionSlice"

export const store = configureStore({
  reducer: {
    locale: localeReducer,
    session: sessionReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
