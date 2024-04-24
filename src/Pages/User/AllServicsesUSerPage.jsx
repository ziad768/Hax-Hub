import AllServices from '../../components/AllServices'
import CompanyPapers from '../../components/CompanyPapers'
import NewRequest from '../../components/newRequest'
import SidbarUser from '../../components/ٍSidbar/SidbarUser'

function AllServicsesUSerPage() {
  return (
    <div className="col-12 m-auto d-flex">


    <div className="col-3 d-none d-xl-block">
     <SidbarUser/>
    </div>



   <div className="col-12 col-xl-9 py-4">
     <AllServices/>
   </div>

   </div>
)

}

export default AllServicsesUSerPage