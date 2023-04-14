import { React, useContext } from "react";
import { QuizContext } from "../context/quiz";
import axios from "axios";
import { saveAs } from "file-saver";

export default function Result() {
  const [quizState, dispatch] = useContext(QuizContext);
  const state = {
    name: quizState.personalInfo,
    score: quizState.correctAnswerCount,
  };

  const createAndDownloadPDF = () => {
    axios
      .post("/create-pdf", state)
      .then(() => axios.get("/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "Диплом.pdf");
      });
  };

  const successCondition =
    quizState.correctAnswerCount >= quizState.questions.length / 2
      ? true
      : false;

  return (
    <>
      <div className="congratulations-card">
        <h2>{successCondition ? "Поздравляем!" : "Упс..."}</h2>
        <p>
          {successCondition
            ? "Вы успешно завершили тест!"
            : "Вы правильно ответили меньше, чем на половину вопросов."}
        </p>
        <p>
          Ваш результат:{" "}
          <span className="score">{quizState.correctAnswerCount}</span> баллов
          из {quizState.questions.length}.
        </p>
        {quizState.correctAnswerCount >= quizState.questions.length / 2 ? (
          <button className="check-answer-btn" onClick={createAndDownloadPDF}>
            Получить диплом на почту
          </button>
        ) : (
          <button
            className="check-answer-btn"
            onClick={() => dispatch({ type: "REFRESH_RESULT" })}
          >
            Пройти тест заново
          </button>
        )}
      </div>
    </>
  );
}
