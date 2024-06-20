import React, { useEffect, useState } from "react";
import "./User.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://crud-app-backend2-v63p.onrender.com/api/getall"
      );
      setUser(response.data);
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(
        `https://crud-app-backend2-v63p.onrender.com/api/delete/${userId}`
      )
      .then((response) => {
        setUser((prevUser) => prevUser.filter((user) => user._id != userId));
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="userTable">
      <Link to={"/add"} className="addButton">
        add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {user.fname} {user.lname}
                </td>
                <td>{user.email}</td>
                <td className="actionButtons">
                  <button onClick={() => deleteUser(user._id)}>
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                  <Link to={`/edit/` + user._id}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
