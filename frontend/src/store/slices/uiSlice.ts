import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isMenuOpen: boolean;
  activeDestination: string | null;
}

const initialState: UIState = {
  isMenuOpen: false,
  activeDestination: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    setActiveDestination: (state, action: PayloadAction<string | null>) => {
      state.activeDestination = action.payload;
    },
  },
});

export const { toggleMenu, setMenuOpen, setActiveDestination } = uiSlice.actions;
export default uiSlice.reducer;
