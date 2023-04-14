import { createContext, useReducer } from "react";
import { data as questions } from "../data";
import { shuffleAnswers } from "../helpers";

const first = {
  ...questions[0],
  answers: shuffleAnswers(questions[0]),
  currentAnswer: "",
  questionDisabled: false,
  choosenAnswer: "",
};

function replaceItem(arr, index, newItem) {
  return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
}

const initialState = {
  personalInfo: {},
  showenQuestions: [first],
  questions,
  showInfo: true,
  showQuiz: false,
  showResult: false,
  currentQuestionIndex: 0,
  correctAnswerCount: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INFO": {
      return {
        ...state,
        personalInfo: action.payload,
      };
    }
    case "START__QUIZ": {
      return {
        ...state,
        personalInfo: {
          email: action.payload.email,
          username: action.payload.username,
        },
        showInfo: false,
        showQuiz: true,
      };
    }
    case "SELECT_ANSWER": {
      const searchedItem = state.showenQuestions[action.payload.index];
      searchedItem.currentAnswer = action.payload.text;
      return {
        ...state,
        showenQuestions: [
          ...state.showenQuestions.slice(0, action.payload.index),
          searchedItem,
          ...state.showenQuestions.slice(action.payload.index + 1),
        ],
      };
    }
    case "NEXT_QUESTION": {
      const correctAnswerCount =
        action.payload.currentAnswer ===
        state.showenQuestions[action.payload.index].correctAnswer
          ? state.correctAnswerCount + 1
          : state.correctAnswerCount;

      const showResult =
        state.showenQuestions.length === state.questions.length;

      if (showResult) {
        return {
          ...state,
          correctAnswerCount,
          showResult,
        };
      }
      const nextQuestion = {
        ...state.questions[action.payload.index + 1],
        answers: shuffleAnswers(state.questions[action.payload.index + 1]),
        currentAnswer: "",
        questionDisabled: false,
        choosenAnswer: "",
      };

      const searchedItem = state.showenQuestions[action.payload.index];
      searchedItem.questionDisabled = true;
      searchedItem.choosenAnswer = action.payload.currentAnswer;

      return {
        ...state,
        correctAnswerCount,
        showResult,
        showenQuestions: [
          ...state.showenQuestions.slice(0, action.payload.index),
          searchedItem,
          ...state.showenQuestions.slice(action.payload.index + 1),
          nextQuestion,
        ],
      };
    }
    case "REFRESH_RESULT": {
      return window.location.reload();
    }
    default:
      break;
  }
  return state;
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return (
    <QuizContext.Provider value={value}> {children} </QuizContext.Provider>
  );
};
