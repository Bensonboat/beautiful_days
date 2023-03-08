import style from "@/styles/homePage/question.module.sass";

export interface IQuestion {
  title: string;
  score: number;
  answers: number;
  viewed: number;
  profileName: string;
  profilePicture: string;
  userPage: string;
  link: string;
  isAnswered: boolean;
}

interface IQuestionProps extends IQuestion {}

const Question = (props: IQuestionProps) => {
  return (
    <div className={style.question}>
      <div className={style.leftBlock}>
        <a href={props.link} target="_blank" className={style.linkTitle}>
          <div className={style.title}>{props.title}</div>
        </a>
        <div className={style.dataBlock}>
          <div className={style.dataItem}>
            <div className={style.dataItemLabel}>Score</div>
            <div
              className={`${
                props.score < 0 ? style.highlightScore : style.dataItemNumber
              }`}
            >
              {props.score}
            </div>
          </div>
          <div className={style.dataItem}>
            <div className={style.dataItemLabel}>Answers</div>
            <div
              className={`${style.answerNumber} ${
                props.isAnswered && style.acceptedAnswer
              } ${props.answers > 0 && style.borderAnswer}`}
            >
              {props.answers}
            </div>
          </div>
          <div className={style.dataItem}>
            <div className={style.dataItemLabel}>Viewed</div>
            <div className={`${style.dataItemNumber}`}>{props.viewed}</div>
          </div>
        </div>
      </div>
      <a href={props.userPage} target="_blank">
        <div className={style.userProfile}>
          <div className={style.avatar}>
            <img
              className={style.img}
              src={props.profilePicture}
              alt="avatar"
            />
          </div>
          <div>{props.profileName}</div>
        </div>
      </a>
    </div>
  );
};

export default Question;
