import { React, useState } from "react";
import axios from "axios";
import User from "./User";

export default function Admin() {
  const [number, setNumber] = useState(0);
  const [users, setUsers] = useState([]);
  const count = 112211;

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (number == count) {
      fetchUsers();
    }
  };

  const fetchUsers = async () => {
    const response = await axios.get("/users");
    setUsers(response.data);
  };

  return (
    <div className="container">
      <form action="" className="admin-wrapper">
        <input onChange={(e) => +setNumber(e.target.value)} type="password" />
      </form>
      {number == count && users && (
        <button
          onClick={(e) => handlerSubmit(e)}
          className="admin-button"
          type="submit"
        >
          Обновить таблицу
        </button>
      )}
      <div className="admin-grid">
        {number == count && users
          ? users
              .sort((a, b) => {
                const order = { new: 0, sended: 1, error: 2 };
                const statusDiff = order[a.status] - order[b.status];
                if (statusDiff !== 0) {
                  return statusDiff;
                } else {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                }
              })
              .map((user, idx) => {
                return <User key={idx} {...user} />;
              })
          : ""}
      </div>
    </div>
  );
}
