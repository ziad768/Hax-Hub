import AllBlogs from '../../components/AllBlogs'
import SidbarAdmin from '../../components/ٍSidbar/SidbarAdmin'

function AllBlogsPage() {
  return (
    <div className="col-11 m-auto  d-lg-flex justify-content-between">


     <SidbarAdmin/>



   <div className="col-12 col-lg-9  py-4">
     <AllBlogs/>
   </div>

   </div>
)

}

export default AllBlogsPage