import API from "@/axios/api";
import { IRootState } from "@/redux";
import {
  updateCurrentPage,
  updateCurrentTagged,
  updateQuestionList,
  updateTrendingTags,
} from "@/redux/homeSlice";
import style from "@/styles/homePage/trendingTagsRow.module.sass";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tag, { ITag } from "./tag";

interface ITrendingTagsRowProps {
  selectTag: (index: number) => void;
}

const TrendingTagsRow = (props: ITrendingTagsRowProps) => {
  const { trendingTags } = useSelector((state: IRootState) => state.homeSlice);

  return (
    <div className={style.trendingTagsRow}>
      <h1>Trending</h1>
      <div className={style.tags}>
        {trendingTags.map((item, index) => {
          return (
            <div
              className={style.tag}
              key={index}
              onClick={() => props.selectTag(index)}
            >
              <Tag {...item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingTagsRow;
