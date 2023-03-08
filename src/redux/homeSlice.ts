import { createSlice } from "@reduxjs/toolkit";
import { ITag } from "@/components/homePage/tag";
import { IQuestion } from "@/components/homePage/question";

export interface IHomeState {
  trendingTags: ITag[];
  questionList: IQuestion[];
  currentTagged: string | null;
  currentPage: number;
  isLoading: boolean;
}

const initialState: IHomeState = {
  trendingTags: [],
  questionList: [],
  currentTagged: null,
  currentPage: 0,
  isLoading: true,
};

export const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    updateTrendingTags: (state, action) => {
      state.trendingTags = action.payload;
    },
    updateCurrentTagged: (state, action) => {
      state.currentTagged = action.payload;
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateQuestionList: (state, action) => {
      state.questionList = action.payload;
    },
    updateIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  updateTrendingTags,
  updateCurrentTagged,
  updateCurrentPage,
  updateQuestionList,
  updateIsLoading,
} = homeSlice.actions;

export default homeSlice.reducer;
