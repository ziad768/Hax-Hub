import PaperDetails from '../../components/PreviewPaper'
import SidbarUser from '../../components/ٍSidbar/SidbarUser'

function PaperDetails() {
  return (
    <div className="col-12 m-auto d-flex">


    <div className="col-3 d-none d-lg-block">
     <SidbarUser/>
    </div>



   <div className="col-12 col-lg-9 py-4">
     <PaperDetails/>
   </div>

   </div>
)

}

export default PaperDetails