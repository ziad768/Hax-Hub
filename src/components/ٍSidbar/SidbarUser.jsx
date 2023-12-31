import { NavLink } from "react-router-dom";

const SidbarUser = () => {
  return (
    <>
      <div className="col-10 mx-auto d-none d-lg-block">
        <div className="sidbarAdmin">
          <div
            className="col-11 pt-2 text-white"
            style={{
              backgroundColor: "#0062FF",
              borderRadius: "0 0 15px 15px",
            }}
          >
            <h1 className="fs-2 py-5 ms-4 mb-3">Dashboard</h1>

        <div className="mt-2 mb-3 d-flex flex-column ms-4">
          <h1 className="my-1  fs-2">
            <h2  className="my-1 text-decoration-none text-white">
              Papers
            </h2>
          </h1>
          <NavLink to="/user/add-paper" className="text-decoration-none  text-white">
            Add Papers
          </NavLink>
          <NavLink to="/user/personal" className="text-decoration-none  text-white">
            Personal Papers
          </NavLink>
          <NavLink to="/user/companyPapers" className="text-decoration-none text-white">
           Company Papers
          </NavLink>
          <h2 className="my-1  fs-2 mt-2">
            <h2  className=" my-1 text-decoration-none text-white">
              Services
            </h2>
          </h2>
          <NavLink to="/user/newRequestService" className="text-decoration-none text-white">
          request new service
          </NavLink>
         
          <NavLink to="/user/allServices" className="text-decoration-none text-white">
          all services
          </NavLink>
          <h2 className="my-1 fs-3 mt-2">
            <NavLink to="/setting" className="text-decoration-none text-white">
              settings
            </NavLink>
          </h2>
        </div>

            <div>
              <button className="btn btn-dark col-12 py-3 fs-4 mt-3">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 d-block d-lg-none">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" to="/user">
              user
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link "
              aria-current="page"
              to="/user/companyPapers"
            >
              AllUser
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/user/personal">
              ِAdd user
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link " to="/admin/AllServices">
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/allblogs">
              Blogs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/create">
              Add Blog
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidbarUser;
