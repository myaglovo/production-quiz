import { React, useContext } from "react";
import Info from "./Info";
import Question from "./Question";
import Result from "./Result";
import { QuizContext } from "../context/quiz";
import Header from "./Header";

export default function Quiz() {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <>
      <div className="img-cover"></div>
      <div className="overflow"></div>
      <Header />
      <div className="quiz">
        <div className="container">
          <div className="quiz-wrapper">
            {quizState.showInfo && <Info />}
            {!quizState.showResult &&
              quizState.showQuiz &&
              quizState.showenQuestions.map((question, index) => (
                <Question key={index} index={index} props={question} />
              ))}
            {quizState.showResult && <Result />}
          </div>
        </div>
      </div>
    </>
  );
}
