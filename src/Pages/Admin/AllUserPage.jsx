
import AllUsers from '../../components/AllUsers'
import SidbarAdmin from '../../components/ٍSidbar/SidbarAdmin'

function AllUserPage() {
  return (
    <div className="col-11 m-auto   d-lg-flex">


     <SidbarAdmin/>



   <div className="col-12 flex-grow-1 col-lg-8 py-4">
     <AllUsers/>
   </div>

   </div> 
)

}

export default AllUserPage