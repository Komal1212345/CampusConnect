import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "./css/Admin.css";

function Admin() {
  const [users, setUsers] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8081/users");
      const formattedUsers = response.data.map((user) => ({
        ...user,
        created_on: moment(user.created_on).format("DD MMMM YYYY"),
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const [display, setDisplay] = useState("users");

  // Delete User Function
  const handleDeleteUserClick = (userId) => {
    axios
      .delete(`http://localhost:8081/deleteuser/${userId}`)
      .then((response) => {
        console.log("User deleted:", response.data);
        loadUsers(); // Refresh users after user deletion
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="admin-container">
      <ul className="nav nav-pills">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${display === "users" ? "active" : ""}`}
            href="#"
            onClick={() => setDisplay("users")}
          >
            Users
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${display === "posts" ? "active" : ""}`}
            href="#"
            onClick={() => setDisplay("posts")}
          >
            Posts
          </a>
        </li>
      </ul>

      {/* Displaying Users */}
      {display === "users" && (
        <div className="tab-content">
          {/* Current User */}
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Profile Picture</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Date Joined</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map(
                (user) =>
                  loggedInUser &&
                  loggedInUser.user_id === user.user_id && (
                    <tr key={user.user_id} className="tbl-rows">
                      <th>{user.user_id}</th>
                      <td>
                        {user.profile_picture ? (
                          <img
                            src={user.profile_picture}
                            className="admin-profile-picture"
                            alt={`Profile of ${user.username}`}
                          />
                        ) : (
                          <img
                            src={require("../assets/placeholder.png")}
                            className="admin-profile-picture"
                            alt="Placeholder"
                          />
                        )}
                      </td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>@{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.gender}</td>
                      <td>{user.created_on}</td>
                      <td>{user.admin ? <p>Admin</p> : <p>User</p>}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fi fi-rr-menu-dots"></i>
                        </button>
                        <div className="dropdown-menu">
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => {
                              handleDeleteUserClick(user.user_id);
                            }}
                          >
                            <i className="fi fi-rr-trash"></i>
                            <span className="delete-dropdown">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>

          {/* Rest of the Users */}
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Profile Picture</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Date Joined</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map(
                (user) =>
                  loggedInUser &&
                  loggedInUser.user_id !== user.user_id && (
                    <tr key={user.user_id} className="tbl-rows">
                      <th>{user.user_id}</th>
                      <td>
                        {user.profile_picture ? (
                          <img
                            src={user.profile_picture}
                            className="admin-profile-picture"
                            alt={`Profile of ${user.username}`}
                          />
                        ) : (
                          <img
                            src={require("../assets/placeholder.png")}
                            className="admin-profile-picture"
                            alt="Placeholder"
                          />
                        )}
                      </td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>@{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.gender}</td>
                      <td>{user.created_on}</td>
                      <td>{user.admin ? <p>Admin</p> : <p>User</p>}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fi fi-rr-menu-dots"></i>
                        </button>
                        <div className="dropdown-menu">
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={() => {
                              handleDeleteUserClick(user.user_id);
                            }}
                          >
                            <i className="fi fi-rr-trash"></i>
                            <span className="delete-dropdown">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Displaying Posts */}
      {display === "posts" && (
        <div className="tab-content">
          {/* Remainder of the posts rendering code goes here */}
        </div>
      )}
    </div>
  );
}

export default Admin;
