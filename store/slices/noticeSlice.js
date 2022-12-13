import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { client } from "../../utils/client";

const name = "noticeSlice";
const initialState = {
  notices: [],
  loading: false,
};

export const fetchNotice = createAsyncThunk(
  `${name}/fetchNotice`,
  async ({}, thunkAPI) => {
    const notices = await client("GET", "/push/notice");
    if (notices.error) {
      return thunkAPI.rejectWithValue([]);
    }
    return notices.data;
  }
);

export const noticeSlice = createSlice({
  name,
  initialState,
  reducers: {
    setNotice: (state, action) => {
      state.notices = action.payload;
    },
  },
  extraReducers: {
    [fetchNotice.pending.type]: (state, action) => {
      state.loading = true;
    },
    [fetchNotice.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.notices = action.payload;
    },
    [fetchNotice.rejected.type]: (state, action) => {
      state.loading = false;
      state.notices = action.payload;
    },
  },
});
export const { setMeal } = noticeSlice.actions;

export default noticeSlice.reducer;
