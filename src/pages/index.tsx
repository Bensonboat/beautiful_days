import style from "@/styles/homePage/index.module.sass";
import Search from "@/components/homePage/search";
import TrendingTagsRow from "@/components/homePage/trendingTagsRow";
import QuestionList from "@/components/homePage/questionList";
import API, { IFetchTrendingTagsParams } from "@/axios/api";
import { ITag } from "@/components/homePage/tag";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentPage,
  updateCurrentTagged,
  updateIsLoading,
  updateQuestionList,
  updateTrendingTags,
} from "@/redux/homeSlice";
import { useCallback, useEffect } from "react";
import { IRootState } from "@/redux";
import { debounce } from "lodash";

const HomePage = () => {
  const dispatch = useDispatch();
  const { trendingTags, isLoading } = useSelector(
    (state: IRootState) => state.homeSlice
  );

  const getTrendingTags = async (terms?: string) => {
    try {
      let params = {} as IFetchTrendingTagsParams;
      if (terms) {
        params.inname = terms;
      }
      const res = await API.getTrendingTags(params);
      return res.data.items;
    } catch (err) {
      throw err;
    }
  };

  const parseTags = (res: { name: string }[]) => {
    const parsed: ITag[] = res.map((item, index) => {
      let selected = false;

      if (index === 0) {
        // First one default selected
        selected = true;
        dispatch(updateCurrentTagged(item.name));
      }

      return {
        label: item.name,
        selected,
      };
    });
    return parsed;
  };

  const selectTag = (index: number) => {
    // Only can select one tag at a time
    const updated = trendingTags.map((item, itemIndex) => {
      let obj: ITag = {
        label: item.label,
        selected: false,
      };

      if (index === itemIndex) {
        obj.selected = true;
        dispatch(updateQuestionList([]));
        dispatch(updateCurrentPage(0));
        dispatch(updateCurrentTagged(item.label));
      }
      return obj;
    });
    dispatch(updateTrendingTags(updated));
  };

  const updateTags = async (terms?: string) => {
    const list = await getTrendingTags(terms);
    const parsed = parseTags(list);

    if (parsed.length > 0) {
      dispatch(updateCurrentTagged(parsed[0].label));
    } else {
      dispatch(updateCurrentTagged(null));
      dispatch(updateQuestionList([]));
      dispatch(updateIsLoading(false));
    }
    dispatch(updateTrendingTags(parsed));
  };

  const debounceUpdate = useCallback(debounce(updateTags, 500), []);

  useEffect(() => {
    updateTags();
  }, []);

  return (
    <div className={style.homePage}>
      <div className={style.container}>
        <div className={style.componentWidth}>
          <Search updateTags={debounceUpdate} />
        </div>
        <div className={style.scrollBlock}>
          <div className={style.componentWidth}>
            <TrendingTagsRow selectTag={selectTag} />
          </div>
          <div className={style.questionList}>
            <div className={style.componentWidth}>
              {isLoading && (
                <img src="/loading.png" alt="" className={style.loading} />
              )}
              <QuestionList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
