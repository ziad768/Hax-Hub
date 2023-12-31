import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser } from "../Redux/Slice/userSlice";

function AddUsers() {
  const { register, handleSubmit,reset } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== undefined)
    );
    if (filteredData.password !== filteredData.confirmPassword) {
      return toast.warn("Passwords do not match");
    }
    delete filteredData.confirmPassword;
    dispatch(createUser(filteredData))
      .unwrap()
      .then(() => {
        toast.success("User Created Successfully");
        reset()
      })
      .catch((backendError) => {
        console.log(backendError);
        toast.error(backendError.message);
      });
  };
  return (
    <form  onSubmit={handleSubmit(onSubmit)} className="bg-white   me-3 mt-4 pt-5 pb-5 shadow-sm conform ">
      <h4>add new user</h4>
      <hr className="text-secondary opacity-25 shadow-sm" />
      <div className=" col-lg-7 p-4 border  form shadow-sm  col-sm-12 ">
        <label className="form-label">user email</label>

        <input
          type="email"
          className="form-control  mb-3 shadow-sm"
          placeholder="example@email.com"
          {...register("email")}
        />

        <label className="form-label">user name</label>
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="type unique username"
          required=""
          {...register("username")}
        />
        <div className="d-flex justify-content-between  mb-4  mt-3">
          <div className="col-5 ">
            <label className="form-label ">password</label>
            <input
              type="password"
              className="form-control shadow-sm "
              placeholder="***********"
              {...register("password")}
            />
          </div>
          <div className="col-5 ">
            <label className="form-label">repeat password</label>
            <input
              type="password"
              className="form-control shadow-sm "
              placeholder="***********"
              {...register("confirmPassword")}
            />
          </div>
        </div>
        <button type="submit" className=" px-5 bt">
          create user
        </button>
      </div>
    </form>
  );
}

export default AddUsers;
