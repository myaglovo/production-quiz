import { React, useContext, useState } from "react";
import { QuizContext } from "../context/quiz";
import Answer from "./Answer";

export default function Quiestion({ index, props }) {
  const {
    question,
    incorrectAnswers,
    correctAnswer,
    answers,
    choosenAnswer,
    currentAnswer,
    questionDisabled,
  } = props;
  const [disabled, setDisabled] = useState(true);
  const [quizState, dispatch] = useContext(QuizContext);

  console.log("choosenAnswer ---", choosenAnswer);
  console.log("correctAnswers ---", correctAnswer);

  const handlerClickNext = () => {
    dispatch({ type: "NEXT_QUESTION", payload: { index, currentAnswer } });
    setDisabled(true);
  };

  const onSelectAnswer = (text) => {
    dispatch({ type: "SELECT_ANSWER", payload: { index, text } });
    setDisabled(false);
  };

  return (
    <div className="question-card">
      <div className="question-number">
        Вопрос {index + 1} / {quizState.questions.length}
      </div>
      <div className="question-text">{props.question}</div>
      <ul className="answer-options">
        {props.answers.map((answer, idx) => (
          <Answer
            choosenAnswer={choosenAnswer}
            currentQuestionId={index}
            key={idx}
            disabled={questionDisabled}
            text={answer}
            index={index}
            currentAnswer={currentAnswer}
            correctAnswer={correctAnswer}
            onSelectAnswer={onSelectAnswer}
          />
        ))}
      </ul>
      <button
        className={
          questionDisabled
            ? "check-answer-btn disabled"
            : "check-answer-btn left"
        }
        onClick={handlerClickNext}
        disabled={disabled}
      >
        {props.currentAnswer === "" ? "Выберите вариант" : "Проверить ответ"}
      </button>
    </div>
  );
}
