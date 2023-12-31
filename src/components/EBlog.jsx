import { Link } from "react-router-dom";
import Blog from "./Blog";
import { useTranslation } from "react-i18next";

function EBlog() {
  const [t , i18n] = useTranslation()
  return (
    <div className="col-10 m-auto">
      <h2 className="ms-2 my-4 ">{t('exploreBlogs')}</h2>
      <div className="d-flex justify-content-between col-12 flex-wrap">
        <div className="col-12 col-md-6 col-xl-4 p-2">
          <Blog />
        </div>
        <div className="col-12 col-md-6 col-xl-4 p-2">
          <Blog />
        </div>
        <div className="col-12 col-md-4 d-none d-xl-block p-2">
          <Blog />
        </div>
      </div>
      <div className="text-end my-2 ">
      <Link to={'/Blogs'} className="text-dark   border-bottom border-dark  text-decoration-underline" >
      <a className="h4 my-2 ">View ALL</a>
      <i className="fas fa-caret-right fs-3 mx-2"></i></Link>
      </div>
    </div>
  );
}

export default EBlog;
