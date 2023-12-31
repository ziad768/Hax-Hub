import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; // Update with your actual slice import
import { useNavigate, useParams } from "react-router-dom";
import { deletePaper, getPaper, updatePaper } from "../Redux/Slice/papersSlice";

function PaperDetails() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { paper } = useSelector((state) => state.papers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getPaper(id));
      } catch (error) {
        console.error("Error fetching paper:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  const { register, handleSubmit, setValue } = useForm();
  const [image, setImage] = useState(paper?.image || null);
  const [paperImage, setPaperImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const imageInput = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    setValue("title", paper?.title);
    setValue("category", paper?.category);
    setValue("description", paper?.description);
    setValue("company", paper?.company);
    setValue("status", paper?.status);
  }, [paper]);
  const imageUpload = () => {
    imageInput.current.click();
  };

  const imageDisplay = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPaperImage(URL.createObjectURL(file));
    }
  };
  console.log(paper);
  const onSubmit = (data) => {
    if (image) {
      data.image = image;
    }

    dispatch(updatePaper({ _id: paper?._id, papersData: data }))
      .unwrap()
      .then(() => {
        toast.success("Paper details updated successfully");
        setIsEditing(false);
        if (paper?.company ===true) {
          navigate("/user/companyPapers");
        } else if(paper?.company ===false){
          navigate("/user/personal");
        }
      })
      .catch((backendError) => { 
        console.log(backendError);
        toast.error(backendError.error);
      });
  };
  const onDelete = () => {
    dispatch(deletePaper(id))
      .unwrap()
      .then(() => {
        toast.success("Paper deleted successfully");
        // console.log();
        if (paper.company) {
            navigate("/user/companyPapers");
          } else {
            navigate("/user/personal");
          }
      })
      .catch((backendError) => {
        console.log(backendError);
        toast.error(backendError.error);
      });
  };
  useEffect(() => {
    setPaperImage(`http://localhost:4000/uploads/${paper?.paper}`);
  }, [paper]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white  px-3 me-3 mt-4 pt-5 pb-5 shadow-sm conform "
    >
      <h4>{isEditing ? "Edit Paper" : "Paper Details"}</h4>
      <hr className="text-secondary opacity-25 shadow-sm" />
      <div className=" col-lg-7 p-4 border form shadow-sm col-sm-12 ">
        <div className="d-flex justify-content-between mb-4 mt-3">
          <div className="col-6 ">
            <label className="form-label">Paper Title</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control shadow-sm "
                placeholder="Enter paper title"
                {...register("title")}
              />
            ) : (
              <p>{paper?.title}</p>
            )}
          </div>
          <div className="col-5 ">
            <label className="form-label">Category</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control shadow-sm "
                placeholder="Enter category"
                {...register("category")}
              />
            ) : (
              <p>{paper?.category}</p>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between mb-4 mt-3">
          <div className="col-6 ">
            <label className="form-label">Upload Image</label>
            {isEditing ? (
              <>
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
              </>
            ) : (
              <img src={paperImage} className="w-50" alt="Paper" />
            )}
          </div>
          <div className="col-5 ">
            <label className="form-label">Is Company Paper</label>
            {isEditing ? (
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="isCompanyPaper"
                  {...register("company")}
                />
                <label className="form-check-label" htmlFor="isCompanyPaper">
                  Yes
                </label>
              </div>
            ) : (
              <p>{paper?.company ? "Yes" : "No"}</p>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between mb-4 mt-3">
          <div className="col-6 ">
            <label className="form-label">Paper Status</label>
            {isEditing ? (
              <select className="form-select shadow-sm" {...register("status")}>
                <option value="not valid">Not Valid</option>
                <option value="valid">Valid</option>
              </select>
            ) : (
              <p>{paper?.status}</p>
            )}
          </div>
          {/* Add other fields here */}
        </div>
        <label className="form-label">Paper Description</label>
        {isEditing ? (
          <textarea
            className="form-control mb-3  shadow-sm"
            style={{ height: 150 }}
            placeholder="Enter paper description"
            {...register("description")}
          />
        ) : (
          <p>{paper?.description}</p>
        )}

        <div className="text-end">
          {isEditing ? (
            <>
              <button type="submit" className="px-5 bt">
                Save Changes
              </button>
            </>
          ) : (
            <>
              <span
                type="button"
                className="btn btn-warning"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </span>
              <span
                type="button"
                className="btn btn-danger ms-3"
                onClick={onDelete}
              >
                Delete
              </span>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default PaperDetails;
