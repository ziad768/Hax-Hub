import { useRef, useState } from "react";
import img from "../assets/upload.png";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createService } from "../Redux/Slice/serviceSlice";

function AddService() {
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [serviceImage, setServiceImage] = useState(img);
  const imageInput = useRef();
  const dispatch = useDispatch();

  const imageUpload = () => {
    imageInput.current.click();
  };

  const imageDisplay = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setServiceImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    if (image) {
      data.image = image;
    }
    console.log(data);
    dispatch(createService(data))
      .unwrap()
      .then(() => {
        toast.success("Service created successfully");
      })
      .catch((backendError) => {
        console.log(backendError);
        toast.error(backendError.error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-3 me-3 mt-4 pt-5 pb-5 shadow-sm conform"
    >
      <h4>Add new Service</h4>
      <hr className="text-secondary opacity-25 shadow-sm" />
      <div className="col-lg-7 p-4 border form shadow-sm col-sm-12">
        <div className="d-flex justify-content-between mb-4 mt-3">
          <div className="col-6">
            <label className="form-label">Service Title</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Service title"
              {...register("title")}
            />
          </div>
          <div className="col-5">
            <label className="form-label">Select User or Tax</label>
            <select className="form-control shadow-sm" {...register("user")}>
              <option value="User">User</option>
              <option value="Tax">Tax</option>
            </select>
          </div>
        </div>
        <div className="col-6">
          <label className="form-label">Upload Image</label>
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
            <img src={serviceImage} className="w-50" alt="Service" />
          </div>
        </div>
        <label className="form-label mt-3">Service Description</label>
        <textarea
          className="form-control mb-3 shadow-sm"
          style={{ height: 150 }}
          placeholder="Service description"
          {...register("description")}
        />

        <div className="d-flex justify-content-between mb-4 mt-3">
          <div className="col-6">
            <label className="form-label">Select Service Status</label>
            <select className="form-control shadow-sm" {...register("status")}>
              <option value="completed">Completed</option>
              <option value="not_completed">Not Completed</option>
            </select>
          </div>
        </div>

        <button type="submit" className="px-5 bt">
          Create Service
        </button>
      </div>
    </form>
  );
}

export default AddService;
