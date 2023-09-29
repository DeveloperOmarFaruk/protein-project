import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./Product.css";
import "../Users/Users.css";
import bacteria from "../../Images/bacteria.jpg";
import axios from "axios";

const Product = ({
  all_product,
  updateProductList,
  deleteFromProductList,
  editProducList,
}) => {
  // Modal State
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [product, setProduct] = useState([]);

  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => {
    setType("");
    setTitle("");
    setServiceList([{}]);
    setAddShow(true);
  };

  const handleEditClose = () => setEditShow(false);

  const handleEditShow = (id) => {
    setProductId(id);
    axios
      .get(`https://protien.catkinsofttech-bd.com/api/product/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setType(res.data.product_type);
        setServiceList(res.data.variants);
        setEditableData(res.data);
        setProduct(res.data);
        setEditShow(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // Product Input State
  const [serviceList, setServiceList] = useState([]);

  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
    setEditableData((prevState) => ({ ...prevState, variants: list }));
  };

  const handleVPriceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    let variant_type =
      index === 0 ? "researcher" : index === 1 ? "designer" : "leader";
    list[index]["variant_type"] = variant_type;
    setServiceList(list);
    setEditableData((prevState) => ({ ...prevState, variants: list }));
  };

  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);
    setEditableData((prevState) => ({ ...prevState, variants: list }));
  };

  // Select Input State
  const [type, setType] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [productPhoto, setProductPhoto] = React.useState();
  const [orderPagePhoto, setOrderPagePhoto] = React.useState();
  const [editableData, setEditableData] = React.useState();
  const [productData, setProductData] = React.useState({
    complimentary: false,
  });

  const handleProductData = (event) => {
    setProductData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleProductEdit = (event) => {
    setEditableData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleComplimentary = (event) => {
    setProductData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));

    if (event.target.checked && serviceList.length == 3) {
      let newList = [...serviceList];
      newList[2].price = 0.5;
      setServiceList(newList);
      // setServiceList(prevState => ([...prevState, prevState[2].price = 0]))
    }
  };

  const handleEditComplimentary = (event) => {
    setEditableData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));

    if (event.target.checked && serviceList.length == 3) {
      let newList = [...serviceList];
      newList[2].price = 0.5;
      setServiceList(newList);
      // setServiceList(prevState => ([...prevState, prevState[2].price = 0]))
    }
  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, {}]);
    setEditableData({
      ...editableData,
      variants: [...editableData.variants, {}],
    });
  };

  const handleSubdmit = () => {
    let data = {
      ...productData,
      variants: serviceList,
      image_path: null,
      checkout_image_path: null,
    };

    let body = new FormData();
    body.append("protein-img", productPhoto);

    axios
      .post("https://protien.catkinsofttech-bd.com/protien-image-upload", body)
      .then((res) => {
        data["image_path"] = res.data;
        setProductPhoto(null);
        // let body1 = new FormData();
        // body1.append("protein-img", orderPagePhoto);
        // axios
        //   .post(
        //     "https://protein.catkinsofttech-bd.com/protien-image-upload",
        //     body1
        //   )
        //   .then((res) => {
        //     data["checkout_image_path"] = res.data;
        //     setOrderPagePhoto(null);

        axios
          .post(
            `https://protien.catkinsofttech-bd.com/api/product/create`,
            data
          )
          .then((res) => {
            handleAddClose();
            // let z = res.data;
            // let new_vr = {};
            // z.variants.map((vt) => {
            //   new_vr[vt.variant_type] = vt;
            // })
            // z.variants = new_vr;
            // console.log(z)
            updateProductList(res.data);
            setProductData({ complimentary: false });
          })
          .catch((err) => {
            console.log(err.message);
          });
        // })
        // .catch((err) => {
        //   alert("No Image provided");
        //   console.log("Failed to save image");
        // });
      })
      .catch((err) => {
        alert("No Image provided");
        console.log("Failed to save image");
      });
  };

  const callUpdateAPI = (updateImages) => {
    let newData = editableData;
    newData = { ...editableData, ...updateImages };
    axios
      .patch(
        `https://protien.catkinsofttech-bd.com/api/product/update`,
        newData
      )
      .then((res) => {
        editProducList(newData);
        handleEditClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleUpdate = () => {
    let updateImages = {};

    if (productPhoto) {
      let body = new FormData();
      body.append("protein-img", productPhoto);

      axios
        .post(
          "https://protien.catkinsofttech-bd.com/protien-image-upload",
          body
        )
        .then((res) => {
          updateImages["image_path"] = res.data;
          if (orderPagePhoto) {
            let body1 = new FormData();
            body1.append("protein-img", orderPagePhoto);

            axios
              .post(
                "https://protien.catkinsofttech-bd.com/protien-image-upload",
                body1
              )
              .then((res) => {
                updateImages["checkout_image_path"] = res.data;
                callUpdateAPI(updateImages);
              })
              .catch((err) => {
                console.log("Failed to save image");
              });
          } else callUpdateAPI(updateImages);
        })
        .catch((err) => {
          console.log("Failed to save image");
        });
    } else if (orderPagePhoto) {
      let body1 = new FormData();
      body1.append("protein-img", orderPagePhoto);

      axios
        .post(
          "https://protien.catkinsofttech-bd.com/protien-image-upload",
          body1
        )
        .then((res) => {
          updateImages["checkout_image_path"] = res.data;
          if (productPhoto) {
            let body = new FormData();
            body.append("protein-img", productPhoto);

            axios
              .post(
                "https://protien.catkinsofttech-bd.com/protien-image-upload",
                body
              )
              .then((res) => {
                updateImages["image_path"] = res.data;
                callUpdateAPI(updateImages);
              })
              .catch((err) => {
                console.log("Failed to save image");
              });
          } else callUpdateAPI(updateImages);
        })
        .catch((err) => {
          console.log("Failed to save image");
        });
    } else callUpdateAPI(updateImages);
  };

  const handleDelete = (id) => {
    const data = {
      id: id,
    };
    axios
      .delete(`https://protien.catkinsofttech-bd.com/api/product/delete/${id}`)
      .then((res) => {
        deleteFromProductList(id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  console.log(productData);
  return (
    <>
      <div className="product-container">
        <div className="user-container-title">
          <p>Product Dashboard</p>
          <button onClick={handleAddShow}>Add</button>
        </div>

        <div className="dashboard-user-table-container">
          <table className="dashboard-user-table">
            <thead>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th colSpan="1">PMS Matrix</th>
              <th colSpan="2">PMR Matrix</th>
              <th colspan="2">Researcher</th>
              <th colspan="2">Designer</th>
              <th colspan="2">Leader</th>
              <th colspan="2">Protein ID</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              {/* <th></th> */}
            </thead>
            <thead>
              <th>Type</th>
              <th>Organism</th>
              <th>Protein</th>
              <th>Amino Acids</th>
              <th>PMS Tables</th>
              <th>PMR Tables</th>
              <th>PMR Positions</th>
              <th>Pkg</th>
              <th>Price</th>
              <th>Pkg</th>
              <th>Price</th>
              <th>Pkg</th>
              <th>Price</th>
              <th>NCBI ID</th>
              <th>UniProt ID</th>
              <th>Complimentary ?</th>
              <th>Product Photo</th>
              {/* <th>Order Photo</th> */}
              <th></th>
              <th></th>
            </thead>
            <tbody>
              {all_product?.map((item) => {
                return (
                  <tr>
                    <td data-label="Type">{item.type}</td>

                    <td data-label="Organism" className="td-overflow-scroll">
                      {item.organism_name}
                    </td>
                    <td data-label="Protein">{item.protein_name}</td>
                    <td data-label="Amino Acids">{item.amino_acids}</td>
                    <td data-label="PMS Tables">{item.pms_tables}</td>
                    <td data-label="PMR Tables">{item.pmr_tables}</td>
                    <td data-label="PMR Positions">{item.pmr_positions}</td>

                    {item.variants[0] !== undefined &&
                    item.variants[0].variant_type === "researcher" ? (
                      <>
                        <td data-label="Pkg">{item.variants[0].pckage_pkg}</td>
                        <td data-label="Price" className="td-overflow-scroll">
                          {item.variants[0].price}
                        </td>
                      </>
                    ) : (
                      <>
                        <td data-label="Pkg">-</td>
                        <td data-label="Price" className="td-overflow-scroll">
                          -
                        </td>
                      </>
                    )}

                    {item.variants[1] !== undefined &&
                    item.variants[1].variant_type === "designer" ? (
                      <>
                        <td data-label="Pkg">{item.variants[1].pckage_pkg}</td>
                        <td data-label="Price" className="td-overflow-scroll">
                          {item.variants[1].price}
                        </td>
                      </>
                    ) : (
                      <>
                        <td data-label="Pkg">-</td>
                        <td data-label="Price" className="td-overflow-scroll">
                          -
                        </td>
                      </>
                    )}

                    {item.variants[2] !== undefined &&
                    item.variants[2].variant_type === "leader" ? (
                      <>
                        <td data-label="Pkg">{item.variants[2].pckage_pkg}</td>
                        <td data-label="Price" className="td-overflow-scroll">
                          {item.variants[2].price}
                        </td>
                      </>
                    ) : (
                      <>
                        <td data-label="Pkg">-</td>
                        <td data-label="Price" className="td-overflow-scroll">
                          -
                        </td>
                      </>
                    )}

                    <td data-label="NCBI ID">{item.ncbi_id}</td>
                    <td data-label="UniProt ID">{item.uniport_id}</td>

                    <td data-label="Complimentary">
                      <input
                        type="checkbox"
                        name="complimentary"
                        checked={item.complimentary}
                      />
                    </td>

                    <td data-label="Product Photo">
                      <img
                        className="pro-ord-img"
                        src={`https://protien.catkinsofttech-bd.com/${item.image_path}`}
                        alt={bacteria}
                      />
                    </td>
                    {/* <td data-label="Order Photo">
                      <img
                        className="pro-ord-img-order"
                        src={`https://protein.catkinsofttech-bd.com/${item.checkout_image_path}`}
                        alt={bacteria}
                      />
                    </td> */}
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
              })}
            </tbody>
          </table>
        </div>

        {/* ======================================================================================= */}
        {/* Product Add Form Section */}
        {/* ======================================================================================= */}
        <Modal show={addShow} onHide={handleAddClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Product Add
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form>
                <div className="product-form-container">
                  <div className="product-form-col-6">
                    <div className="variant-title">
                      <p>Input Product</p>
                    </div>

                    <FormControl
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={productData.type}
                        onChange={handleProductData}
                        autoWidth
                        label="Type"
                        name="type"
                      >
                        <MenuItem
                          value={"bacteria"}
                          sx={{ width: 500, maxWidth: "100%" }}
                        >
                          Bacteria
                        </MenuItem>
                        <MenuItem
                          value={"virus"}
                          sx={{ width: 500, maxWidth: "100%" }}
                        >
                          Virus
                        </MenuItem>
                      </Select>
                    </FormControl>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={productData.organism_name}
                        className="variant-input"
                        fullWidth
                        label="Organism Name"
                        name="organism_name"
                        id="fullWidth"
                        type="text"
                        onChange={handleProductData}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={productData.protein_name}
                        onChange={handleProductData}
                        fullWidth
                        label="Protein Name"
                        name={"protein_name"}
                        id="fullWidth"
                        type="text"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={productData.amino_acids}
                        onChange={handleProductData}
                        fullWidth
                        label="Amino Acids"
                        name="amino_acids"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={productData.pms_tables}
                        onChange={handleProductData}
                        fullWidth
                        label="PMS Matrix Tables"
                        name="pms_tables"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={productData.pmr_tables}
                        onChange={handleProductData}
                        fullWidth
                        label="PMR Matrix Tables"
                        name="pmr_tables"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={productData.pmr_positions}
                        onChange={handleProductData}
                        fullWidth
                        label="PMR Matrix Positions"
                        name="pmr_positions"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={productData.ncbi_id}
                        onChange={handleProductData}
                        fullWidth
                        label="Protein ID NCBI"
                        name="ncbi_id"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={productData.uniport_id}
                        onChange={handleProductData}
                        fullWidth
                        label="Protein ID UniProt"
                        name="uniport_id"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <div className="label-holder">
                      <p> Complimentary</p>

                      <input
                        type="checkbox"
                        name="complimentary"
                        onChange={handleComplimentary}
                      />
                    </div>

                    <div className="label-holder">
                      <p> Product Page Photo</p>

                      <input
                        type="file"
                        onChange={(e) => setProductPhoto(e.target.files[0])}
                      />
                    </div>

                    {/* <div className="label-holder">
                      <p> Order Page Photo</p>

                      <input
                        type="file"
                        onChange={(e) => setOrderPagePhoto(e.target.files[0])}
                      />
                    </div> */}
                  </div>

                  <div className="product-form-col-6">
                    <div className="variant-title">
                      <p>Input Variant Package</p>
                    </div>

                    <div className="form-field">
                      {serviceList.map((singleService, index) => (
                        <div key={index}>
                          <p className="variant-input-package-title">
                            {index === 0
                              ? "Researcher"
                              : index === 1
                              ? "Designer"
                              : "Leader"}{" "}
                            Package
                          </p>
                          <div className="variant-input-container">
                            <div className="variant-division">
                              <FormControl
                                sx={{
                                  width: "100%",
                                  maxWidth: "100%",
                                  margin: "10px 0px 20px 0px",
                                }}
                              >
                                <InputLabel id="demo-simple-select-autowidth-label">
                                  Pkg
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-autowidth-label"
                                  id="demo-simple-select-autowidth"
                                  value={singleService.pckage_pkg}
                                  onChange={(e) => handleVPriceChange(e, index)}
                                  autoWidth
                                  label="Pkg"
                                  name="pckage_pkg"
                                >
                                  <MenuItem
                                    value={"pmr"}
                                    sx={{
                                      minWidth: 500,
                                      width: 550,
                                      maxWidth: 550,
                                    }}
                                  >
                                    PMR
                                  </MenuItem>
                                  <MenuItem
                                    value={"pms"}
                                    sx={{
                                      minWidth: 500,
                                      width: 550,
                                      maxWidth: 550,
                                    }}
                                  >
                                    PMS
                                  </MenuItem>

                                  <MenuItem
                                    value={"pms_pmr"}
                                    sx={{
                                      minWidth: 500,
                                      width: 550,
                                      maxWidth: 550,
                                    }}
                                  >
                                    PMS, PMR
                                  </MenuItem>
                                </Select>
                              </FormControl>

                              <TextField
                                className="variant-input mt-2"
                                name="price"
                                fullWidth
                                label="Price $"
                                id="fullWidth"
                                disabled={
                                  index === 2 && productData.complimentary
                                }
                                type="number"
                                value={singleService.price}
                                onChange={(e) => handleVPriceChange(e, index)}
                              />

                              {serviceList.length - 1 === index &&
                                serviceList.length < 3 && (
                                  <button
                                    type="button"
                                    onClick={handleServiceAdd}
                                    className="add-btn"
                                  >
                                    <span>Add More</span>
                                  </button>
                                )}
                            </div>
                            <div className="variant-second-division">
                              {serviceList.length !== 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleServiceRemove(index)}
                                  className="remove-btn"
                                >
                                  <span>Remove</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <input
                  type="button"
                  onClick={handleSubdmit}
                  value="Submit"
                  className="product-submit-btn"
                />
              </form>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ======================================================================================= */}
        {/* Product Edit Form Section */}
        {/* ======================================================================================= */}
        <Modal show={editShow} onHide={handleEditClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Product Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <form>
                <div className="product-form-container">
                  <div className="product-form-col-6">
                    <div className="variant-title">
                      <p>Input Product</p>
                    </div>

                    <FormControl
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={editableData && editableData.type}
                        onChange={handleProductEdit}
                        autoWidth
                        label="Type"
                        name="type"
                      >
                        <MenuItem
                          value={"bacteria"}
                          sx={{ width: 500, maxWidth: "100%" }}
                        >
                          Bacteria
                        </MenuItem>
                        <MenuItem
                          value={"virus"}
                          sx={{ width: 500, maxWidth: "100%" }}
                        >
                          Virus
                        </MenuItem>
                      </Select>
                    </FormControl>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={editableData && editableData.organism_name}
                        fullWidth
                        label="Organism Name"
                        id="fullWidth"
                        type="text"
                        name={"organism_name"}
                        onChange={handleProductEdit}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={editableData && editableData.protein_name}
                        // onChange={(e) => {
                        //   setTitle(e.target.value);
                        //   setEditableData((prevState) => ({
                        //     ...prevState,
                        //     title: e.target.value,
                        //   }));
                        // }}
                        onChange={handleProductEdit}
                        fullWidth
                        label="Protein Name"
                        id="fullWidth"
                        type="text"
                        name="protein_name"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={editableData && editableData.amino_acids}
                        fullWidth
                        label="Amino Acids"
                        id="fullWidth"
                        name="amino_acids"
                        onChange={handleProductEdit}
                        type="number"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={editableData && editableData.pms_tables}
                        onChange={handleProductEdit}
                        fullWidth
                        label="PMS Matrix Tables"
                        name="pms_tables"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={editableData && editableData.pmr_tables}
                        onChange={handleProductEdit}
                        fullWidth
                        label="PMR Matrix Tables"
                        name="pmr_tables"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={editableData && editableData.pmr_positions}
                        onChange={handleProductEdit}
                        fullWidth
                        label="PMR Matrix Positions"
                        name="pmr_positions"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={editableData && editableData.ncbi_id}
                        onChange={handleProductEdit}
                        fullWidth
                        label="Protein ID NCBI"
                        name="ncbi_id"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        margin: "10px 0px 20px 0px",
                      }}
                    >
                      <TextField
                        value={editableData && editableData.uniport_id}
                        onChange={handleProductEdit}
                        fullWidth
                        label="Protein ID UniProt"
                        name="uniport_id"
                        id="fullWidth"
                        type="number"
                      />
                    </Box>

                    <div className="label-holder">
                      <p> Complimentary</p>

                      <input
                        type="checkbox"
                        name="complimentary"
                        defaultChecked={
                          editableData && editableData.complimentary
                        }
                        onChange={handleEditComplimentary}
                      />
                    </div>

                    <div className="label-holder">
                      <p> Product Page Photo</p>

                      <input
                        type="file"
                        id="pp"
                        onChange={(e) => setProductPhoto(e.target.files[0])}
                      />
                    </div>

                    {/* <div className="label-holder">
                      <p> Order Page Photo</p>

                      <input
                        type="file"
                        id="op"
                        onChange={(e) => setOrderPagePhoto(e.target.files[0])}
                      />
                    </div> */}
                  </div>

                  <div className="product-form-col-6">
                    <div className="variant-title">
                      <p>Input Variant Package</p>
                    </div>

                    <div className="form-field">
                      {editableData &&
                        editableData.variants.map((singleService, index) => (
                          <div key={index}>
                            <p className="variant-input-package-title">
                              {index === 0
                                ? "Researcher"
                                : index === 1
                                ? "Designer"
                                : "Leader"}{" "}
                              Package
                            </p>

                            <div className="variant-input-container">
                              <div className="variant-division">
                                <FormControl
                                  sx={{
                                    width: "100%",
                                    maxWidth: "100%",
                                    margin: "10px 0px 20px 0px",
                                  }}
                                >
                                  <InputLabel id="demo-simple-select-autowidth-label">
                                    Pkg
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={singleService.pckage_pkg}
                                    onChange={(e) =>
                                      handleVPriceChange(e, index)
                                    }
                                    autoWidth
                                    label="Pkg"
                                    name="pckage_pkg"
                                  >
                                    <MenuItem
                                      value={"pmr"}
                                      sx={{
                                        minWidth: 500,
                                        width: 550,
                                        maxWidth: 550,
                                      }}
                                    >
                                      PMR
                                    </MenuItem>
                                    <MenuItem
                                      value={"pms"}
                                      sx={{
                                        minWidth: 500,
                                        width: 550,
                                        maxWidth: 550,
                                      }}
                                    >
                                      PMS
                                    </MenuItem>

                                    <MenuItem
                                      value={"pms_pmr"}
                                      sx={{
                                        minWidth: 500,
                                        width: 550,
                                        maxWidth: 550,
                                      }}
                                    >
                                      PMS, PMR
                                    </MenuItem>
                                  </Select>
                                </FormControl>

                                <TextField
                                  className="variant-input mt-2"
                                  name="price"
                                  fullWidth
                                  label="Price $"
                                  id="fullWidth"
                                  type="number"
                                  value={singleService.price}
                                  onChange={(e) => handleVPriceChange(e, index)}
                                  disabled={
                                    index === 2 && editableData.complimentary
                                  }
                                />

                                {serviceList.length - 1 === index &&
                                  serviceList.length < 3 && (
                                    <button
                                      type="button"
                                      onClick={handleServiceAdd}
                                      className="add-btn"
                                    >
                                      <span>Add More</span>
                                    </button>
                                  )}
                              </div>
                              <div className="variant-second-division">
                                {serviceList.length !== 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleServiceRemove(index)}
                                    className="remove-btn"
                                  >
                                    <span>Remove</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                <input
                  type="button"
                  value="Submit"
                  onClick={handleUpdate}
                  className="product-submit-btn"
                />
              </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Product;
