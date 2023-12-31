import AddUsers from '../../components/AddUsers'
import SidbarAdmin from '../../components/ٍSidbar/SidbarAdmin'

function AddUserPage() {
  return (
    <div className="col-11 m-auto  d-lg-flex justify-content-between">


     <SidbarAdmin/>



   <div className="col-12 col-lg-9  py-4">
     <AddUsers/>
   </div>

   </div>
)

}

export default AddUserPage