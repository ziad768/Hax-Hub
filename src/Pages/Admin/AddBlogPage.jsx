import AddBlog from '../../components/AddBlog'
import SidbarAdmin from '../../components/ٍSidbar/SidbarAdmin'

function AddBlogPage() {
  return (
    <div className="col-11 m-auto   d-lg-flex justify-content-between">


     <SidbarAdmin/>



   <div className="col-12 flex-grow-1 col-lg-8  py-4">
     <AddBlog/>
   </div>

   </div>
)

}

export default AddBlogPage