import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { BsFacebook, BsGoogle, BsLinkedin, BsTwitter } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/Slice/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== undefined)
    );

    dispatch(loginUser(filteredData))
      .unwrap()
      .then(() => {
        toast.success("successfully");
        navigate("/");
      })
      .catch((backendError) => {
        toast.error(backendError.error);
      });
  };
  return (
    <div
      className="col-12 d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div
        className="col-9 overflow-hidden"
        style={{
          height: "85vh",
          borderRadius: "15px",
          backgroundColor: "#F7FAFC",
        }}
      >
        <div className="text-center pt-5">
          <h4 className=" h41 fw-bold fs-1">Welcome to Tax Hub</h4>
        </div>
        <form
          className="m-auto col-11 text-center overflow-hidden"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h5 className="mt-1 h51 fs-5">Sign in to continue</h5>
          <div className="position-relative col-10  mt-5 m-auto">
            <FontAwesomeIcon
              className="fs-5 position-absolute inp-name"
              icon={faEnvelope}
            />
            <InputText
              type="email"
              id="email"
              className="col-12 inp1 ps-5 fw-bold"
              placeholder="Your Email"
              {...register("email")}
            />
          </div>
          <div className="position-relative col-10 mt-3 m-auto">
            <FontAwesomeIcon
              className="fs-5 position-absolute inp-name"
              icon={faLock}
            />
            <InputText
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="col-12 inp1 ps-5 fw-bold"
              id="password"
              {...register("password")}
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className=" bg-transparent border-0 fs-5 show-password-button"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9098b1",
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          <input
            type="submit"
            value="Login"
            className="col-10 inp2 mt-4 fs-5 fw-bold text-white"
            id="sign_in"
            style={{ backgroundColor: "blue" }}
          />
          <div className="m-auto d-block d-lg-flex  justify-content-between col-10 text-center">
            <h6 className="mt-4 fs-6 h61">
              Don't have a account ?
              <Link
                to={"/Signup"}
                className="fw-bold ms-1"
                style={{ color: "blue" }}
              >
                Register
              </Link>
            </h6>
            <h6 className="mt-4 fs-6 h61">
              <Checkbox
                className="me-1"
                style={{ paddingTop: "1px" }}
                onChange={(e) => setChecked(e.checked)}
                checked={checked}
              ></Checkbox>
              Remember Me
            </h6>
          </div>
        </form>
        <div className="m-auto col-10 text-center">
          <h6 className="mt-4 fs-6 h61">Or login with</h6>
          <h6 className="mt-5 d-flex justify-content-between col-6 col-lg-3  m-auto fs-2 h61">
            <a href="#" style={{ color: "#9098b1" }}>
              <BsFacebook className="fs-1 text-ww" />
            </a>
            <a href="#" style={{ color: "#9098b1" }}>
              <BsTwitter className="fs-1 text-ww" />
            </a>
            <a href="#" style={{ color: "#9098b1" }}>
              <BsLinkedin className="fs-1 text-ww" />
            </a>
            <a href="#" style={{ color: "#9098b1" }}>
              <BsGoogle className="fs-1 text-ww" />
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Login;
