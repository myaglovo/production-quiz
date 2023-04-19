import React from "react";

export default function Answer({
  text,
  index,
  onSelectAnswer,
  currentAnswer,
  disabled,
  choosenAnswer,
  correctAnswer,
  currentQuestionId,
}) {
  const isCorrectAnswer = choosenAnswer && correctAnswer === text;
  const isWrongAnswer =
    choosenAnswer === text && choosenAnswer !== correctAnswer;

  const handlerSelectAnswer = (text) => {
    onSelectAnswer(text);
  };

  let classes = "";

  if (isCorrectAnswer) {
    classes += "correct";
  } else if (isWrongAnswer) {
    classes += "wrong";
  }

  return (
    <li
      className={disabled ? "disabled" : ""}
      id={currentQuestionId}
      onClick={() => handlerSelectAnswer(text)}
    >
      <label htmlFor={`${text} ${index}`} className={classes}>
        <input
          type="radio"
          id={`${text} ${index}`}
          name={currentQuestionId}
          value={`${text} ${index}`}
        />
        {text}
      </label>
    </li>
  );
}
