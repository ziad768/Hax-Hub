import CompanyPapers from '../../components/CompanyPapers'
import NewRequest from '../../components/NewRequest'
import SidbarUser from '../../components/ٍSidbar/SidbarUser'

function NewRequestPage() {
  return (
    <div className="col-12 m-auto d-flex">


    <div className="col-3 d-none d-xl-block">
     <SidbarUser/>
    </div>



   <div className="col-12 col-xl-9 py-4">
     <NewRequest/>
   </div>

   </div>
)

}

export default NewRequestPage
