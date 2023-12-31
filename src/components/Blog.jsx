import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const baseURL = "http://localhost:4000/uploads";
  const maxLength = 100;
  const truncatedDescription = blog?.description.slice(0, maxLength);
  return (
    blog && (
      <div className="col-12 rounded-4 border border-primary p-4">
        <img
          src={`${baseURL}/${blog?.image}`}
          alt=""
          className="w-100 rounded-4"
        />
        <h4 className="my-3">{blog?.title}</h4>
        <h6>
          {" "}
          {blog?.description.length > maxLength
            ? `${truncatedDescription} ...`
            : blog?.description}
        </h6>
        <Link
          to={`/blogdetails/${blog?._id}`}
          className="text-dark h5 mt-3 d-block"
        >
          Read more
        </Link>
      </div>
    )
  );
};

export default Blog;
