import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const name = "mealSlice";
const initialState = {
  meals: [],
  loading: false,
};

export const fetchMeal = createAsyncThunk(
  `${name}/fetchMeal`,
  async ({ date }, thunkAPI) => {
    try {
      const meals = await axios.get(
        `https://open.neis.go.kr/hub/mealServiceDietInfo?type=json&SD_SCHUL_CODE=7310561&ATPT_OFCDC_SC_CODE=E10&MLSV_YMD=${date}&KEY=c83cfc7e1e3c48249749f57fb666ed16`
      );
      if (!meals.data.mealServiceDietInfo) {
        return ["해당하는 날짜는 급식이 없습니다"];
      }
      let todayMeal = meals.data.mealServiceDietInfo[1]["row"][0]["DDISH_NM"];
      todayMeal = todayMeal.split("<br/>");
      return todayMeal;
    } catch (e) {
      return thunkAPI.rejectWithValue([
        "급식을 불러오는중 오류가 발생했습니다",
      ]);
    }
  }
);

export const mealSlice = createSlice({
  name,
  initialState,
  reducers: {
    setMeal: (state, action) => {
      state.meals = action.payload;
    },
  },
  extraReducers: {
    [fetchMeal.pending.type]: (state, action) => {
      state.loading = true;
      state.meals = []
    },
    [fetchMeal.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.meals = action.payload;
    },
    [fetchMeal.rejected.type]: (state, action) => {
      state.loading = false;
      state.meals = action.payload;
    },
  },
});
export const { setMeal } = mealSlice.actions;

export default mealSlice.reducer;
