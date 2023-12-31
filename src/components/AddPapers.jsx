import React, { useRef, useState } from "react";
import img from "../assets/upload.png";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createPaper } from "../Redux/Slice/papersSlice";
// import { createPaper } from "../redux/slice/paperSlice"; // Update with your actual slice import

function AddPaper() {
  const { register, handleSubmit, setValue } = useForm();
  const [image, setImage] = useState(null);
  const [paperImage, setPaperImage] = useState(img);
  const [isCompanyPaper, setIsCompanyPaper] = useState(false);
  const [paperStatus, setPaperStatus] = useState("Not Completed");
  const imageInput = useRef();
  const dispatch = useDispatch();

  function imageUpload() {
    imageInput.current.click();
  }

  function imageDisplay(e) {
    let file = e.target.files[0];
    if (file) {
      setImage(file);
      setPaperImage(URL.createObjectURL(file));
    }
  }

  const onSubmit = (data) => {
    if (image) {
      data.image = image;
    }

    // <Add></Add>ing isCompanyPaper and paperStatus to the data
    data.company = isCompanyPaper;
    data.status = paperStatus;

    console.log(data);
    dispatch(createPaper(data)) // Update with your actual createPaper action
      .unwrap()
      .then(() => {
        toast.success("Paper created successfully");
      })
      .catch((backendError) => {
        console.log(backendError);
        toast.error(backendError.error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white  px-3 me-3 mt-4 pt-5 pb-5 shadow-sm conform "
    >
      <h4>Add New Paper</h4>
      <hr className="text-secondary opacity-25 shadow-sm" />
      <div className=" col-lg-7 p-4 border  form shadow-sm  col-sm-12 ">
        <div className="d-flex justify-content-between  mb-4  mt-3">
          <div className="col-6 ">
            <label className="form-label ">Paper Title</label>
            <input
              type="text"
              className="form-control shadow-sm "
              placeholder="Enter paper title"
              {...register("title")}
            />
          </div>
          <div className="col-5 ">
            <label className="form-label">Category</label>
            <input
              type="text"
              className="form-control shadow-sm "
              placeholder="Enter category"
              {...register("category")}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between  mb-4  mt-3">
          <div className="col-6  ">
            <label className="form-label ">Upload Image</label>
            <input
              className="form-control shadow-sm d-none"
              type="file"
              accept="image/*"
              onChange={imageDisplay}
              ref={imageInput}
              placeholder=""
            />
            <div
              className="border rounded text-center w-100"
              onClick={imageUpload}
              style={{ cursor: "pointer" }}
            >
              <img src={paperImage} className="w-50" alt="Paper" />
            </div>
          </div>
          <div className="col-5 ">
            <label className="form-label">Is Company Paper</label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isCompanyPaper"
                checked={isCompanyPaper}
                onChange={() => setIsCompanyPaper(!isCompanyPaper)}
              />
              <label className="form-check-label" htmlFor="isCompanyPaper">
                Yes
              </label>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between  mb-4  mt-3">
          <div className="col-6 ">
            <label className="form-label">Paper Status</label>
            <select
              className="form-select shadow-sm"
              {...register("status")}
              onChange={(e) => setPaperStatus(e.target.value)}
            >
              <option value="valid"> Valid</option>
              <option value="not valid">Not Valid</option>
            </select>
          </div>
          {/* Add other fields here */}
        </div>
        <label className="form-label">Paper Description</label>
        <textarea
          className="form-control mb-3  shadow-sm"
          style={{ height: 150 }}
          placeholder="Enter paper description"
          {...register("description")}
        />

        <button type="submit" className=" px-5 bt">
          Create Paper
        </button>
      </div>
    </form>
  );
}

export default AddPaper;
