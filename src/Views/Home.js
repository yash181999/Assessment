import { Avatar, Button, IconButton } from "@material-ui/core";
import { Close, Delete, Edit, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { auth } from "../fireabse";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddItemForm from "./AddItemForm";
import { useDispatch, useSelector } from "react-redux";
import { productList, removeFromList } from "../features/appSlice";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
    width: "80%",
    boxShadow: theme.shadows[5],
  },
}));

function Home() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const list = useSelector(productList);
  const dispatch = useDispatch();
  const [type, setType] = useState("ADD");
  const [itemIndex, setItemIndex] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    return handleClose();
  }, [list]);

  const editItem = (index) => {
    setType("EDIT");
    setItemIndex(index);
    handleOpen();
  };

  const deleteItem = (index) => {
    dispatch(removeFromList(index));
  };

  const addItem = () => {
    setType("ADD");
    handleOpen();
  };

  const [openImageUrl, setOpenImageUrl] = useState(null);

  const [openImageModal, setOpenImageModal] = useState(false);

  const handleOpenImageModal = (url) => {
    setOpenImageUrl(url);
    setOpenImageModal(true);
  };

  const handelCloseImage = () => {
    setOpenImageModal(false);
  };

  return (
    <div className="home">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ padding: "10px" }}>
                <h3>{`${type == "ADD" ? "Add Product" : "Edit Product"}`}</h3>
              </div>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </div>
            <AddItemForm type={type} itemIndex={itemIndex} />
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openImageModal}
        onClose={handelCloseImage}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openImageModal}>
          <div className={classes.paper}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton onClick={handelCloseImage}>
                <Close />
              </IconButton>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                padding: "5px",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  width: "80%",
                  height: "80%",
                  objectFit: "contain",
                }}
                src={openImageUrl}
              ></img>
            </div>
          </div>
        </Fade>
      </Modal>
      <div className="nav">
        <Avatar
          style={{ cursor: "pointer" }}
          onClick={() => auth.signOut()}
        ></Avatar>

        <Button
          onClick={addItem}
          style={{ backgroundColor: "#23C4ED", color: "white" }}
        >
          Add Item
        </Button>
      </div>

      <div className="table">
        <table>
          <tr>
            <th>Name</th>
            <th>Length</th>
            <th>Breadth</th>
            <th>Height</th>
            <th>Volume</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {list.map((value, index) => {
            const { productName, length, breadth, height, volume, image } =
              value.list;
            return (
              <tr key={index}>
                <td>{productName}</td>
                <td>{length}</td>
                <td>{breadth}</td>
                <td>{height}</td>
                <td>{volume}</td>

                <td>
                  <img
                    onClick={(e) =>
                      handleOpenImageModal(image)
                    }
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "contain",
                    }}
                    src={image}
                  ></img>
                </td>
                <td>
                  <IconButton onClick={(e) => editItem(index)}>
                    <Edit style={{ color: "#3DBE29" }} />
                  </IconButton>
                </td>
                <td>
                  <IconButton onClick={(e) => deleteItem(index)}>
                    <Delete style={{ color: "#D82E2F" }} />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Home;
