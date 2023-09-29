import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Users.css";
import axios from "axios";

const Users = ({
  userList,
  updateUserList,
  deleteFromUserList,
  editUserList,
}) => {
  const [userId, setUserId] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => setAddShow(true);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (id) => {
    setEditShow(true);
    axios
      .get(`https://protien.catkinsofttech-bd.com/api/user/${id}`)
      .then((res) => {
        setUserId(id);
        setUserName(res.data.username);
        setEmail(res.data.email);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDelete = (id) => {
    const data = {
      id: id,
    };
    axios
      .delete(`https://protien.catkinsofttech-bd.com/api/user/delete`, {
        data: data,
      })
      .then((res) => {
        console.log("delete");
        deleteFromUserList(id);
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  };

  const handleSave = () => {
    const data = {
      username: username,
      password: password,
      confirm_password: password,
      email: email,
      first_name: first_name,
      last_name: last_name,
    };
    axios
      .post(`https://protien.catkinsofttech-bd.com/api/user/create`, data)
      .then((res) => {
        console.log("added");
        updateUserList(res.data);
        handleAddClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleEdit = () => {
    const data = {
      id: userId,
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
    };
    axios
      .patch(`https://protien.catkinsofttech-bd.com/api/user/update`, data)
      .then((res) => {
        console.log("update");
        editUserList(res.data);
        handleEditClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="user-container">
        <div className="user-container-title">
          <p>User Dashboard</p>
          <button onClick={handleAddShow}>Add</button>
        </div>
        <div className="dashboard-user-table-container">
          <table className="dashboard-user-table">
            <thead style={{ height: ".2rem" }}>
              <th>User Name</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              {userList.length ? (
                userList.map((item) => {
                  return (
                    <tr>
                      <td data-label="User Name">{item.username}</td>
                      <td data-label="Email">{item.email}</td>
                      <td data-label="First Name">{item.first_name}</td>
                      <td data-label="Last Name">{item.last_name}</td>
                      <td>
                        <button
                          className="user-edit-btn"
                          onClick={() => {
                            handleEditShow(item.id);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="user-delete-btn"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>

        <Modal show={addShow} onHide={handleAddClose}>
          <Modal.Header closeButton>
            <Modal.Title>User Add</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <TextField
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                fullWidth
                label="User Name"
                id="fullWidth"
                type="text"
              />
            </Box>

            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                margin: "20px 0px",
              }}
            >
              <TextField
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                fullWidth
                label="Email"
                id="fullWidth"
                type="email"
              />
            </Box>

            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                margin: "20px 0px",
              }}
            >
              <TextField
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                fullWidth
                label="Password"
                id="fullWidth"
                type="password"
              />
            </Box>

            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                margin: "20px 0px",
              }}
            >
              <TextField
                value={first_name}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                fullWidth
                label="First Name"
                id="first_name"
                type="text"
              />
            </Box>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                margin: "20px 0px",
              }}
            >
              <TextField
                value={last_name}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                fullWidth
                label="Last Name"
                id="last_name"
                type="text"
              />
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={editShow} onHide={handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>User Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
              }}
            >
              <TextField
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
                label="User Name"
                id="fullWidth"
                type="text"
              />
            </Box>

            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                margin: "20px 0px",
              }}
            >
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                label="Email"
                id="fullWidth"
                type="email"
              />
            </Box>

            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                margin: "20px 0px",
              }}
            >
              <TextField
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                label="First Name"
                id="fullWidth"
                type="text"
              />
            </Box>

            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                margin: "20px 0px",
              }}
            >
              <TextField
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                label="Last Name"
                id="fullWidth"
                type="text"
              />
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Users;
