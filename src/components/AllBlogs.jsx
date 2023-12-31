import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import BlogAdmin from "./BlogAdmin";
import { useDispatch, useSelector } from "react-redux";
import {  deleteBlogAction, getAllBlogsAction } from "../redux/slice/blogSlice";

export default function AllBlogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshBlogs, setRefreshBlogs] = useState(false);
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogsAction());
  }, [dispatch]);

const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const updatedBlogs = blogs.map((blog, index) => ({
    ...blog,
    number: index + 1,
    createdAt: formatCreatedAt(blog.createdAt),
  }));

  const filteredBlogs = updatedBlogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="col-12 m-auto p-fluid py-4 px-5 mb-4"
      style={{ borderRadius: "15px", backgroundColor: "#fff" }}
    >
      <div className="d-flex justify-content-between">
        <div className="col-7">
          <h2
            className="ms-2 mt-2"
            style={{ color: "#4A5568", fontSize: "25px" }}
          >
            All blogs
          </h2>
        </div>
        <div className="position-relative mb-3 col-4 me-3">
          <FontAwesomeIcon
            className="fs-5 position-absolute"
            icon={faSearch}
            style={{ top: "12px", left: "13px", color: "#9098b1" }}
          />
          <InputText
            className="py-2 px-5 "
            placeholder="Search list..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="col-12 d-flex flex-wrap">
        {filteredBlogs?.map((blog) => (
          <div className="col-12 col-md-6 col-xl-4 p-2" key={blog._id}>
            <BlogAdmin blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
