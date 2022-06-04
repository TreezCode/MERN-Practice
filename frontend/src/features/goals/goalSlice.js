import { createSlice } from '@reduxjs/toolkit';

const goalSlice = createSlice({
  name: 'goal',
  initialState: {
    goals: [],
  },
  reducers: {
    reset: (state, action) => {
      state.goals = []
    },
    setGoals: (state, action) => {
      state.goals = action.payload
    },
  },
});

export const { reset, setGoals, setEditView } = goalSlice.actions;
export default goalSlice.reducer;

export const selectCurrentGoals = (state) => state.goal.goals;
