import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface LoacationsState {
  mylocations: any[];
  currentLocation: any[];
  prev_Locations: any[];
}

const initialState: LoacationsState = {
  mylocations: [],
  currentLocation: [],
  prev_Locations: [],
};

export const LocationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLoctions: (state, action: PayloadAction<any>) => {
      state.mylocations.push(action.payload);
    },
    removeLocations: (state, action: PayloadAction<any>) => {
      state.mylocations = state.mylocations.filter(
        (item) => item.id !== action.payload
      );
    },
    deleteAllLocations: (state) => {
      state.mylocations = [];
    },
  },
});

export const { addLoctions, deleteAllLocations, removeLocations } =
  LocationsSlice.actions;

export const selectLocations = (state: RootState) =>
  state.locations.mylocations;

export default LocationsSlice.reducer;
