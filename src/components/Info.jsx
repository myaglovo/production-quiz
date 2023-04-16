import { React, useContext } from "react";
import { useForm } from "react-hook-form";
import { QuizContext } from "../context/quiz";

export default function Info() {
  const [quizState, dispatch] = useContext(QuizContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const capitalizeWords = (str) => {
    return str.toLowerCase().replace(/(^|\s)\S/g, function (l) {
      return l.toUpperCase();
    });
  };
  const onSubmit = (data) => {
    const { username, email } = data;
    const capitalizedUserName = capitalizeWords(username);
    dispatch({ type: "START__QUIZ", payload: { capitalizedUserName, email } });
  };

  return (
    <>
      <div className="card card--center">
        <h1 className="title-h1">Я помню. Я горжусь</h1>
        <p className="text p-2">
          Проверьте свои знания о вкладе ямальцев в Великую Победу!<br></br>
          Пройдите тест из {quizState.questions.length} вопросов. Чтобы получить
          диплом на электронный адрес, необходимо правильно ответить более чем
          на половину вопросов.
        </p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name" className="text">
              ФИО в дипломе
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Награждается Иванов Иван Васильевич"
              required
              {...register("username", {
                required: true,
                pattern: /[а-яА-ЯёЁ]/,
              })}
            />
            {errors.username && (
              <span>Поле ФИО обязательно. Используйте кириллицу.</span>
            )}
          </div>
          <div className="form-group">
            <label className="text" htmlFor="email">
              Адрес электронной почты
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ivanov@mail.ru"
              required
              {...register("email", {
                required: true,
                pattern: /\S+@\S+\.\S+/,
              })}
            />
            {errors.email && <span>Введите правильный email адрес</span>}
          </div>
          <button
            // disabled={!personalInfo}
            className="check-answer-btn"
            type="submit"
          >
            Начать тест
          </button>
        </form>
      </div>
    </>
  );
}
