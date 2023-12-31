import AddPaper from "../../components/AddPapers"
import SidbarUser from "../../components/ٍSidbar/SidbarUser"

function AddPaperPage() {
  return (
    <div className="col-12 m-auto d-flex">


    <div className="col-3 d-none d-xl-block">
     <SidbarUser/>
    </div>



   <div className="col-12 col-xl-9 py-4">
     <AddPaper/>
   </div>

   </div>
)

}

export default AddPaperPage