
import AddService from '../../components/AddService'
import SidbarAdmin from '../../components/ٍSidbar/SidbarAdmin'

function AddServicePage() {
  return (
    <div className="col-11 m-auto  d-lg-flex justify-content-between">


     <SidbarAdmin/>



   <div className="col-12 col-lg-9  py-4">
     <AddService/>
   </div>

   </div>
)

}

export default AddServicePage