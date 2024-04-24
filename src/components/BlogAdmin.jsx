import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteBlogAction, getAllBlogsAction } from "../redux/slice/blogSlice";
import { toast } from "react-toastify";

const BlogAdmin = ({ blog, onDelete }) => {
  const dispatch = useDispatch();
  const blogImage = `http://localhost:4000/uploads/${blog.image}`;
  const CurrentBlog = (id) => {
    dispatch(fetchBlogById(id));
  };
  const deleteBlog = (id) => {
    try {
      console.log(id);
      dispatch(deleteBlogAction(id))
        .unwrap()
        .then(() => {
          toast.success("Blog Deleted Successfully");
          dispatch(getAllBlogsAction());
        });
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  const maxLength = 100;
  const truncatedDescription = blog.description.slice(0, maxLength);
  return (
    <div className="col-12 rounded-2 border border-primary p-3 position-relative blog-card">
      <img
        src={blogImage}
        alt=""
        height={200}
        style={{ objectFit: "contain" }}
        className="w-100 rounded-4"
      />
      <h4 className="my-3 blog-title">{blog.title}</h4>
      <div className="blog-divider"></div>
      {/* <h6>{blog.description}</h6> */}
      <p className="blog-content"> {blog.description.length > maxLength
                ? `${truncatedDescription} ...`
                : blog.description}</p>
      <div className="text-end blog-readmore">
        <Link
          to={`/blogdetails/${blog._id}`}
          className="text-dark h5 mt-3 d-block"
        >
          Read more...
        </Link>
      </div>
      <div className="blog-icons">
        <Link to={`/admin/editblog/${blog._id}`} className="btn">
          <FontAwesomeIcon color="green" icon={faPenToSquare} />
        </Link>
        <button className="text-danger btn" onClick={()=>deleteBlog(blog._id)}>
          <FontAwesomeIcon color="red" icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default BlogAdmin;
