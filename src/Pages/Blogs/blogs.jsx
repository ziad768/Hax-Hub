import Blog from "../../components/Blog";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsAction } from "../../redux/Slice/blogSlice";
import { Link } from "react-router-dom";

function Blogs() {
  const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  // const fetchedData = useSelector((state) => state.blog.blogs.data);
  const { blogs: fetchedData } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogsAction());
  }, [dispatch]);
  const sortedBlogs = [...fetchedData].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const baseURL = "http://localhost:4000/uploads";
  const srcURL =
    fetchedData?.length > 0 && `${baseURL}/${fetchedData[0]?.image}`;

  const filteredBlogs = fetchedData?.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchQuery?.toLowerCase())
  );
  const maxLength = 400;
  const truncatedDescription = sortedBlogs[0]?.description.slice(0, maxLength);
  return (
    <div>
      <div className="overflow-hidden">
        <div className="w-75 mx-auto text-center mt-5">
          <h2 style={{ textAlign: "center" }} className="infoAbout">
            {t("blogs")}
          </h2>
          <p style={{ color: "#585858", marginTop: "10px" }}>
            {t("infoBlogs")}
          </p>
        </div>
      </div>

      {sortedBlogs && (
        <div className="border col-10 mx-auto rounded p-3 d-flex justify-content-between align-items-center gap-3">
          <div className="col-4">
            <img alt="" src={srcURL} className="w-100  rounded" />
          </div>

          <div className="col-8">
            <h4>{sortedBlogs[0]?.title} </h4>
            <p className="card-text">
              {sortedBlogs[0]?.description.length > maxLength
                ? `${truncatedDescription} ...`
                : sortedBlogs[0]?.description}
            </p>
            {sortedBlogs[0]?.description.length > maxLength && (
              <Link  to={`/blogdetails/${sortedBlogs[0]?._id}`} className="btn btn-primary">
                Read More
              </Link>
            )}
          </div>
        </div>
      )}
      <div className="text-center my-3">
        <input
          type="search"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          width={"120px"}
          style={{
            borderColor: "#0062ff",
            outline: "none",
            borderRadius: "25px",
            paddingLeft: "10px",
          }}
          placeholder="Search...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-between container my-5 flex-wrap">
        {filteredBlogs?.map((blog) => (
          <div className="col-12 col-md-6 col-xl-4 p-2 my-3" key={blog._id}>
            <Blog blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;
