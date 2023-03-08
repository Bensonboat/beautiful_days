import {
  updateCurrentPage,
  updateIsLoading,
  updateQuestionList,
} from "@/redux/homeSlice";
import style from "@/styles/homePage/search.module.sass";
import { DebouncedFunc } from "lodash";
import { useDispatch } from "react-redux";

interface ISearchProps {
  updateTags: DebouncedFunc<(terms?: string | undefined) => Promise<void>>;
}

const Search = (props: ISearchProps) => {
  const dispatch = useDispatch();

  return (
    <div className={style.search}>
      <input
        className={style.inputBlock}
        type="text"
        placeholder="Tag"
        onChange={(e) => {
          props.updateTags(e.target.value);
          dispatch(updateCurrentPage(0));
          dispatch(updateQuestionList([]));
          dispatch(updateIsLoading(true));
        }}
      />
      <div className={style.btn}>Search</div>
    </div>
  );
};

export default Search;
