import { useRef, useState } from "react";
import img from "../assets/upload.png";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createBlog } from "../redux/slice/blogSlice";
function AddBlog() {
  const { register, handleSubmit, setValue } = useForm();
  const [image, setImage] = useState(null);
  const [blogImage, setBlogImage] = useState(img);
  const imageInput = useRef();
  const dispatch = useDispatch();
  function imageUpload() {
    imageInput.current.click();
  }

  function imageDisplay(e) {
    let file = e.target.files[0];
    if (file) {
      setImage(file);
      setBlogImage(URL.createObjectURL(file));
    }
  }
  const onSubmit = (data) => {
    if (image) {
      data.image = image;
    }
    console.log(data);
    dispatch(createBlog(data))
      .unwrap()
      .then(() => {
        toast.success("Blog created successful");
      })
      .catch((backendError) => {
        console.log(backendError);
        toast.error(backendError.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white  px-3 me-3 mt-4 pt-5 pb-5 shadow-sm conform "
    >
      <h4>add new Blog</h4>
      <hr className="text-secondary opacity-25 shadow-sm" />
      <div className=" col-lg-7 p-4 border  form shadow-sm  col-sm-12 ">
        <div className="d-flex justify-content-between  mb-4  mt-3">
          <div className="col-6 ">
            <label className="form-label ">title</label>
            <input
              type="text"
              className="form-control shadow-sm "
              placeholder="your blog title"
              {...register("title")}
            />
          </div>
          <div className="col-5 ">
            <label className="form-label">Tags</label>
            <input
              type="text"
              className="form-control shadow-sm "
              placeholder="enter tags"
              {...register("tags")}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between  mb-4  mt-3">
          <div className="col-6  ">
            <label className="form-label ">Upload</label>
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
              <img src={blogImage} className="w-50" alt="Blog" />
            </div>
          </div>
          <div className="col-5 ">
            <label className="form-label">Category</label>
            <input
              type="text"
              {...register("categories")}
              className="form-control shadow-sm "
              placeholder=""
            />
          </div>
        </div>
        <label className="form-label">Write down your blog</label>
        <textarea
          className="form-control mb-3  shadow-sm"
          style={{ height: 150 }}
          placeholder="your blog"
          {...register("description")}
        />

        <button type="submit" className=" px-5 bt">
          Create Blog
        </button>
      </div>
    </form>
  );
}

export default AddBlog;