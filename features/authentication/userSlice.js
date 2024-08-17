import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.role = action.payload.role;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
