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

  const personalInfo = quizState.personalInfo;

  const onSubmit = (data) => {
    const { username, email } = data;
    console.log(data);
    dispatch({ type: "START__QUIZ", payload: { username, email } });
  };

  return (
    <>
      <div className="welcome-card">
        <h1>Тест на знание истории Салехарда</h1>
        <p>Чтобы начать прходить тест, напишите данные для получения диплома</p>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="name">ФИО в дипломе</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Иванов Иван Васильевич"
              required
              {...register("username", { required: true })}
            />
            {errors.username && <span>Поле имя обязательно</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
