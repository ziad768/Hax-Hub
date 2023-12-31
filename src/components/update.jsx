import { useRef } from "react"
import img from '../assets/upload.png'
import { useFormik } from "formik";
function Updata({type,papers}) {
    const inputImg=useRef()
    const formik = useFormik({
        initialValues: {
            id:papers.id,
            document:papers.document,
            uploadDate:papers.uploadDate,
            lastModified:papers.lastModified,
            action:papers.action,
            inventoryStatus: papers.inventoryStatus,

        },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });
    return (
      <form onSubmit={formik.handleSubmit} className="bg-white  px-3 me-3 mt-4 pt-5 pb-5 shadow-sm conform ">
      <h4>Update {type} </h4>
    <hr  className="text-secondary opacity-25 shadow-sm"/>
    <div className="  p-4 border  form shadow-sm  col-12 ">
    <div className="d-flex justify-content-between  mb-4  mt-3">
    <div className="col-6 ">
      <label  className="form-label ">document</label>
      <input
      onChange={formik.handleChange}
         value={formik.values.document}
         name="document" type="text" className="form-control shadow-sm " placeholder="your document"/> 
    </div>
    <div className="col-5 ">
      <label  className="form-label">upload Date</label>
      <input
      onChange={formik.handleChange}
         value={formik.values.uploadDate}
         name="uploadDate"   type="date" className="form-control shadow-sm " placeholder="uploadDate" />
    </div>
  </div>
  <div className="d-flex justify-content-between  mb-4  mt-3">
  <div className="col-6  ">
    <label  className="form-label ">Upload</label>
    <input
    onChange={formik.handleChange}
         value={formik.values.Upload}
         name="Upload"   type="file" className="form-control shadow-sm d-none " ref={inputImg} placeholder=""/> 
    <div className="border rounded text-center w-100" onClick={()=> inputImg.current.click()}>
    <img src={img} className="w-50 " alt="..." />
    </div>
  </div>
  <div className="col-5 ">
    <label  className="form-label">last Modified</label>
    <input
    onChange={formik.handleChange}
        value={formik.values.lastModified}
        name="lastModified"  
        type="date" className="form-control shadow-sm" placeholder="lastModified" />
        </div>
        </div>
        <label  className="form-label">inventory Status</label>
        <textarea  
        onChange={formik.handleChange}
            value={formik.values.inventoryStatus }
        className="form-control mb-3  shadow-sm" style={{height:150}} placeholder="inventory Status"/>
      </div>
    </form>  )
  }
  
  export default Updata