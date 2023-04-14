import { React, useContext } from "react";
import Info from "./Info";
import Question from "./Question";
import Result from "./Result";
import { QuizContext } from "../context/quiz";

export default function Quiz() {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div className="quiz">
      <div className="container">
        {quizState.showInfo && <Info />}
        {!quizState.showResult &&
          quizState.showQuiz &&
          quizState.showenQuestions.map((question, index) => (
            <Question key={index} index={index} props={question} />
          ))}
        {quizState.showResult && <Result />}
      </div>
    </div>
  );
}
