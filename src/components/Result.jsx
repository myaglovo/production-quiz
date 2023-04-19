import { React, useContext } from "react";
import { QuizContext } from "../context/quiz";
import axios from "axios";
import { saveAs } from "file-saver";

export default function Result() {
  const [quizState, dispatch] = useContext(QuizContext);
  const state = {
    name: quizState.personalInfo.username,
    email: quizState.personalInfo.email,
    score: quizState.correctAnswerCount,
  };

  const createAndDownloadPDF = () => {
    axios.post("http://151.248.126.134:5000/", state);
  };

  const successCondition =
    quizState.correctAnswerCount >= quizState.questions.length / 2
      ? true
      : false;

  if (successCondition) {
    createAndDownloadPDF();
  }

  return (
    <>
      <div className="card card--center">
        <h2 className="title-h1">
          {successCondition ? (
            <div>
              <p className="title-h1">
                Ваш результат:
                <span className="title-h1 span">{` ${quizState.correctAnswerCount} `}</span>
                из {quizState.questions.length}.
              </p>
              <p className="text text--center p-2">
                Поздравляем! Вы успешно прошли тест! Ваш диплом уже готовится.
                Мы направим его на адрес{" "}
                <span style={{ color: "#b32218", textDecoration: "underline" }}>
                  {quizState.personalInfo.email}
                </span>{" "}
                в течение 72 часов.
              </p>
            </div>
          ) : (
            <div>
              <p className="title-h1">
                Ваш результат:
                <span className="title-h1 span">{` ${quizState.correctAnswerCount} `}</span>
                из {quizState.questions.length}.
              </p>
              <p className="text text--center p-2">
                Чтобы получить диплом, вы должны правильно ответить на половину
                вопросов. Пожалуйста, попробуйте еще раз.
              </p>
              <a href="/" className="check-answer-btn">
                Пройти тест заново
              </a>
            </div>
          )}
        </h2>
      </div>
    </>
  );
}
