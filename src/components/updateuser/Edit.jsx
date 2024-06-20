import React, { useEffect, useState } from "react";
import "../adduser/add.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Edit = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(users);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`https://crud-app-backend2-v63p.onrender.com/api/getone/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://crud-app-backend2-v63p.onrender.com/api/update/${id}`, user)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addUser">
      <Link to={"/"}>Back</Link>
      <h3>Upate User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="fname">Fname</label>
          <input
            type="text"
            id="fname"
            value={user.fname}
            onChange={inputChangeHandler}
            name="fname"
            autoComplete="off"
            placeholder="First Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Lname</label>
          <input
            type="text"
            id="lname"
            value={user.lname}
            onChange={inputChangeHandler}
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={inputChangeHandler}
            name="email"
            autoComplete="off"
            placeholder="Email"
          />
        </div>
        {/* <div className="inputGroup">
				<label htmlFor="password">Password</label>
				<input type="text" id="password" name="password" autoComplete="off" placeholder="Password" />
			</div> */}
        <div className="inputGroup">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
