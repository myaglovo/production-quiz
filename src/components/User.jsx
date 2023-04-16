import React from "react";
import axios from "axios";

export default function User({ id, name, email, score, createdAt, status }) {
  const onSubmitHandler = (e) => {
    const dataValue = e.target.getAttribute("data-type");
    if (
      window.confirm(
        `Подтвердите действие: ${
          dataValue === "submit" ? "Отправить email" : "Отклонить заявку"
        }`
      )
    ) {
      sendUserStatus(id, dataValue);
    }
  };

  const sendUserStatus = async (id, dataValue) => {
    await axios.post("/users", { id, dataValue });
  };

  return (
    <div className="admin-grid-item">
      {status === "new" && (
        <div className={`admin-cell ${status}`}>
          <span>НОВЫЙ ЛИД </span>
        </div>
      )}
      {status === "sended" && (
        <div className={`admin-cell ${status}`}>
          <span>EMAIL ОТПРАВЛЕН </span>
        </div>
      )}
      {status === "error" && (
        <div className={`admin-cell ${status}`}>
          <span>ОТКЛОНЕН </span>
        </div>
      )}
      <div className={`admin-cell ${status}`}>
        <span>id: </span>
        {id}
      </div>
      <div className={`admin-cell ${status}`}>
        {" "}
        <span>name: </span> {name}
      </div>
      <div className={`admin-cell ${status}`}>
        <span>email: </span> {email}
      </div>
      <div className={`admin-cell ${status}`}>
        <span>score: </span> {score}
      </div>
      <div className={`admin-cell ${status}`}>
        <span>createdAt: </span> {createdAt}
      </div>
      <div className={`admin-cell ${status}`}>
        <span>status: </span> {status}
      </div>
      {status === "new" && (
        <div>
          <button
            onClick={onSubmitHandler}
            data-type="submit"
            className="admin-button"
          >
            Отправить email
          </button>
          <button
            data-type="error"
            onClick={onSubmitHandler}
            className="admin-button"
          >
            Отклонить заявку
          </button>
        </div>
      )}
    </div>
  );
}
