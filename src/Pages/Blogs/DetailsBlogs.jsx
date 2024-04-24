import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../../Redux/Slice/blogSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function DetailsBlogs() {
  const { id } = useParams();
   const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [dispatch, id]);
  const { currentBlog:blogItem } = useSelector((state) => state.blog);
  console.log(blogItem);

  const baseURL = "http://localhost:4000/uploads";

  return (
    <div className="container ">
      <p className="h2 p-3">{blogItem?.title}</p>
      <p className="h4 p-3 mt-5">{blogItem?.tags}</p>
      <p className="h6 col-sm-10 p-3">{blogItem?.description}</p>
      <p className="h4 p-3">{blogItem?.tags}</p>
      <img
        src={blogItem?.image && `${baseURL}/${blogItem?.image}`}
        className="img-fluid w-100"
        alt="..."
      />
    </div>
  );
}

export default DetailsBlogs;
