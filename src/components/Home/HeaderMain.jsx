import { Link } from "react-router-dom";

function HeaderMian() {
  return (
    <main>
      <div className="main">
        <div className="overlay">
          <div className="container">
            <h1 className=" d-block fs-1">
              Charter Accountat{" "}
              <span className="text-primary ">& Tax Experts</span>{" "}
            </h1>
            <p className="h3 mt-4">
              general professional partnership of Certified Public Accountants
              with strong academic credentials and professional experience. Our
              commitment is not just to provide high-level, impactful, and
              dependable professional services, but also to promote highly
              responsive client relationship.
            </p>
            <div className="mt-4 d-flex  flex-wrap">
              <Link to={'/user/newRequestService'}
                className="btn btn-primary rounded-5 me-2 col-lg-2 col-md-3 col-sm-12 mt-3 "
              >
                Request A Service
              </Link>
              <button
                className="btn btn-outline-primary rounded-5 col-lg-2 col-md-2 col-sm-12 mt-3"
                type="button"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default HeaderMian;
