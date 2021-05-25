import { Button, TextField } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToList, productList, editListItem } from "../features/appSlice";
import "./AddItemForm.css";

function AddItemForm({type,itemIndex}) {
      const item = useSelector(productList);
    
  const [formValue, setFormValue] = useState({
    productName: type === "EDIT" ? item[itemIndex].list.productName : "",
    length: type === "EDIT" ? item[itemIndex].list.length : null,
    breadth: type === "EDIT" ? item[itemIndex].list.breadth : null,
    height: type === "EDIT" ? item[itemIndex].list.height : null,
    volume: type === "EDIT" ? item[itemIndex].list.volume : null,
    image: type === "EDIT" ? item[itemIndex].list.image : null,
  });


  const [errorMessage, setErrorMessage] = useState("");

  const imageRef = useRef(null);

  const dispatch = useDispatch();


  const getImage = (e) => {
    imageRef.current.click();
  };

  const submit = () => {
    if (
      formValue.image == null ||
      !formValue.productName ||
      !formValue.breadth ||
      !formValue.height ||
      !formValue.length
    ) {
      setErrorMessage("Please, fill all required fields *");
    } else {
      dispatch(
        addToList({
          list: formValue,
        })
      );
    }
  };

 

  const editProduct = () => {
      if (
        formValue.image == null ||
        !formValue.productName ||
        !formValue.breadth ||
        !formValue.height ||
        !formValue.length
      ) {
        setErrorMessage("Please, fill all required fields *");
      } else {
        dispatch(
          editListItem({
             index: itemIndex, 
             list: formValue,
          })
        );
      }
  };

  useEffect(() => {
    setFormValue({
      ...formValue,
      volume: formValue.length * formValue.breadth * formValue.height,
    });
  }, [formValue.length, formValue.breadth, formValue.height]);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, [4000]);
  }, [errorMessage]);

  return (
    <div className="addItemForm">
      {errorMessage && <div className="error__message">{errorMessage}</div>}
      <TextField
        className="addItem__input"
        outlined
        value={formValue.productName}
        onChange={(e) =>
          setFormValue({...formValue, productName: e.target.value })
        }
        label={"Product Name*"}
        fullWidth
      ></TextField>
      <TextField
        className="addItem__input"
        style={{ marginTop: "10px" }}
        value={formValue.length != null && formValue.length}
        outlined
        type="number"
        onChange={(e) => setFormValue({ ...formValue, length: e.target.value })}
        label={"Length (mm)*"}
        fullWidth
      ></TextField>
      <TextField
        className="addItem__input"
        style={{ marginTop: "10px" }}
        outlined
        value={formValue.breadth != null && formValue.breadth}
        type="number"
        onChange={(e) =>
          setFormValue({ ...formValue, breadth: e.target.value })
        }
        label={"Breadth (mm)*"}
        fullWidth
      ></TextField>
      <TextField
        className="addItem__input"
        style={{ marginTop: "10px" }}
        outlined
        type="number"
        value={formValue.height != null && formValue.height}
        onChange={(e) => setFormValue({ ...formValue, height: e.target.value })}
        label={"Height (mm)*"}
        fullWidth
      ></TextField>

      <TextField
        className="addItem__input"
        style={{ marginTop: "10px" }}
        outlined
        disabled={!formValue.length || !formValue.breadth || !formValue.height}
        value={`Volume(mm)  =  ${
          formValue.volume != "NaN" && formValue.volume
        }`}
        fullWidth
      ></TextField>
      <input
        onChange={(e) =>
          setFormValue({ ...formValue, image: URL.createObjectURL(e.target.files[0]) })
        }
        hidden
        ref={imageRef}
        type="file"
        accept="image/*"
      ></input>
      <div
        onClick={getImage}
        style={{ color: "gray", cursor: "pointer" }}
        className="image__upload"
      >
        {formValue.image == null ? (
          <div
            style={{
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Add fontSize="large" />
            <h5>Upload Image*</h5>
          </div>
        ) : (
          <img
            style={{ cursor: "pointer", height: "200px", objectFit: "contain" }}
            src={formValue.image}
          ></img>
        )}
      </div>
      <Button
        style={{
          marginTop: "10px",
          backgroundColor: "#23C4ED",
          color: "white",
        }}
        fullWidth
        onClick={() => type === 'EDIT' ? editProduct() : submit()}
      >
        Submit
      </Button>
    </div>
  );
}

export default AddItemForm;
