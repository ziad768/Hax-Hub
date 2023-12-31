import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getService as getServiceAction } from "../Redux/Slice/serviceSlice";

function ServicePreview() {
  const { id } = useParams();
  const { loading, getService } = useSelector((state) => state.service);
  const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch);
//   }, [dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getServiceAction(id));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, [dispatch]);
  // Use the navigate hook to navigate to other pages44444444444
  const navigate = useNavigate();


//   const { title, user, image, description, status } = getService;
const blogImage = `http://localhost:4000/uploads/${getService?.img}`;
  return (
    <div className="bg-white px-3 me-3 mt-4 pt-5 pb-5 shadow-sm conform">
      <h4>Service Preview</h4>
      <hr className="text-secondary opacity-25 shadow-sm" />
      <div className="col-lg-7 p-4 border form shadow-sm col-sm-12">
        <div className="d-flex justify-content-between mb-4 mt-3">
          <div className="col-6">
            <label className="form-label">Service Title</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={getService?.title}
              readOnly
            />
          </div>
          <div className="col-5">
            <label className="form-label">User or Tax</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={getService?.user}
              readOnly
            />
          </div>
        </div>
        <div className="col-6">
          <label className="form-label">Service Image</label>
          <div className="border rounded text-center w-100">
            <img src={blogImage} className="w-50" alt="Service" />
          </div>
        </div>
        <label className="form-label mt-3">Service Description</label>
        <textarea
          className="form-control mb-3 shadow-sm"
          style={{ height: 150 }}
          value={getService?.description}
          readOnly
        />

        <div className="d-flex justify-content-between mb-4 mt-3">
          <div className="col-6">
            <label className="form-label">Service Status</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={getService?.status}
              readOnly
            />
          </div>
        </div>
        <button
          type="button"
          className="px-5 bt"
          onClick={() => navigate("/services")}
        >
          Back to Services
        </button>
      </div>
    </div>
  );
}

export default ServicePreview;
