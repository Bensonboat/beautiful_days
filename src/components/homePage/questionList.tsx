import API from "@/axios/api";
import Question, { IQuestion } from "./question";
import style from "@/styles/homePage/questionList.module.sass";
import { IRootState } from "@/redux";
import {
  updateCurrentPage,
  updateIsLoading,
  updateQuestionList,
} from "@/redux/homeSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const QuestionList = () => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 0.8,
  });
  const { currentPage, currentTagged, questionList, isLoading } = useSelector(
    (state: IRootState) => state.homeSlice
  );

  const getQuestions = async () => {
    try {
      let page = currentPage + 1;
      const params = { page, tagged: currentTagged! };
      const res = await API.getQuestions(params);
      dispatch(updateCurrentPage(page));
      return res.data.items;
    } catch (err) {
      throw err;
    }
  };

  const parseQuestions = (res: any) => {
    const parsed = res.map((item: any) => {
      const obj: IQuestion = {
        isAnswered: item.is_answered,
        answers: item.answer_count,
        viewed: item.view_count,
        title: item.title,
        link: item.link,
        score: item.score,
        profileName: item.owner.display_name,
        profilePicture: item.owner.profile_image,
        userPage: item.owner.link,
      };
      return obj;
    });
    return parsed;
  };

  const updateList = async () => {
    dispatch(updateIsLoading(true));
    const list = await getQuestions();
    const parsed = parseQuestions(list);
    dispatch(updateQuestionList([...questionList, ...parsed]));
    dispatch(updateIsLoading(false));
  };

  useEffect(() => {
    // Initial status
    if (currentTagged !== null) {
      updateList();
    }
  }, [currentTagged]);

  useEffect(() => {
    if (inView) {
      updateList();
    }
  }, [inView]);

  return (
    <div className={style.questionList}>
      {questionList.length === 0 && !isLoading ? (
        <div className={style.notFound}>No Result Found</div>
      ) : (
        <>
          {questionList.map((question, index) => {
            return (
              <div key={`${question.link}_${index}`} ref={ref}>
                <Question {...question} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default QuestionList;
