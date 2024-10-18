import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Reels: null,
  setSelectedReels: null, 
};

const ReelsSlice = createSlice({
  name: "Reels",
  initialState: {
    Reels: [], // Start with an empty array
    selectedReels: null,
  },
  reducers: {
    setReels: (state, action) => {
      console.log("Payload being set to state:", action.payload); // Log the payload to see if data is being received
      state.Reels = action.payload; // Update the Reels array with the API data
    },
    setSelectedReels: (state, action) => {
      state.selectedReels = action.payload;
    },
    addReel: (state, action) => {
      state.Reels.push(action.payload); 
    },
  },
});

export const { setReels, setSelectedReels,addReel } = ReelsSlice.actions;
export default ReelsSlice.reducer;
