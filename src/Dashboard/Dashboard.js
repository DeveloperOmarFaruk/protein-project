import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Product from "./Product/Product";
import Users from "./Users/Users";
import DataUpload from "./DataUpload/DataUpload";
import ContactDetails from "./ContactDetails/ContactDetails";
import axios from "axios";

const Dashboard = () => {
  const [dashBtnActive, setDashBtnActive] = useState("dash-choose1");
  const [user, setUser] = useState(true);
  const [product, setProduct] = useState(false);
  const [dataUpload, setDataUpload] = useState(false);

  const [userList, setUserList] = useState([]);
  const [products, setProducts] = useState([]);
  const [contactDetails, setContactDetails] = useState(false);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://protien.catkinsofttech-bd.com/api/user/list`)
        .then((res) => {
          setUserList(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios
        .get(`https://protien.catkinsofttech-bd.com/api/product/list`)
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]);

  const updateUserList = (data) => {
    setUserList((prevState) => [...prevState, data]);
  };

  const deleteFromUserList = (data) => {
    setUserList((prevState) => prevState.filter((user) => user.id !== data));
  };

  const editUserList = (data) => {
    setUserList((prevState) =>
      prevState.map((user) => (user.id === data.id ? data : user))
    );
  };

  const updateProductList = (data) => {
    setProducts((prevState) => [...prevState, data]);
  };

  const deleteFromProductList = (data) => {
    setProducts((prevState) => prevState.filter((user) => user.id !== data));
  };

  const editProducList = (data) => {
    setProducts((prevState) =>
      prevState.map((user) => (user.id === data.id ? data : user))
    );
  };

  return (
    <>
      <div className="dashboard-section">
        <div className="dashboard-container">
          <div className="dashboard-container-col-3">
            <div className="dashboard-left-title">
              <p>Admin Dashboard</p>
            </div>

            <div className="dashboard-left-btn">
              <button
                onClick={() => {
                  setDashBtnActive("dash-choose1");
                  setUser(true);
                  setProduct(false);
                  setContactDetails(false);
                  setDataUpload(false);
                }}
                className={` ${
                  dashBtnActive === "dash-choose1"
                    ? "dashboard-left-btn-button active-dash-left-btn"
                    : "dashboard-left-btn-button"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => {
                  setDashBtnActive("dash-choose2");
                  setUser(false);
                  setProduct(true);
                  setContactDetails(false);
                  setDataUpload(false);
                }}
                className={` ${
                  dashBtnActive === "dash-choose2"
                    ? "dashboard-left-btn-button active-dash-left-btn"
                    : "dashboard-left-btn-button"
                }`}
              >
                Product
              </button>
              <button
                onClick={() => {
                  setDashBtnActive("dash-choose3");
                  setUser(false);
                  setProduct(false);
                  setContactDetails(true);
                  setDataUpload(false);
                }}
                className={` ${
                  dashBtnActive === "dash-choose3"
                    ? "dashboard-left-btn-button active-dash-left-btn"
                    : "dashboard-left-btn-button"
                }`}
              >
                Contact
              </button>
              <button
                onClick={() => {
                  setDashBtnActive("dash-choose4");
                  setUser(false);
                  setProduct(false);
                  setContactDetails(false);
                  setDataUpload(true);
                }}
                className={` ${
                  dashBtnActive === "dash-choose4"
                    ? "dashboard-left-btn-button active-dash-left-btn"
                    : "dashboard-left-btn-button"
                }`}
              >
                Data Upload
              </button>
            </div>
          </div>

          <div className="dashboard-container-col-9">
            {user && (
              <Users
                userList={userList}
                updateUserList={updateUserList}
                deleteFromUserList={deleteFromUserList}
                editUserList={editUserList}
              />
            )}{" "}
            {product && (
              <Product
                all_product={products}
                updateProductList={updateProductList}
                deleteFromProductList={deleteFromProductList}
                editProducList={editProducList}
              />
            )}
            {contactDetails && <ContactDetails />}
            {dataUpload && <DataUpload />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
