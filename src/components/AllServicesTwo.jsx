import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import{useDispatch,useSelector} from"react-redux";
import { getAllServices ,deleteServiceAction} from "../Redux/Slice/serviceSlice";
import { toast } from "react-toastify";


export default function AllServicesTwo() {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllServices("tttttttttttttttttttt"));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, [dispatch]);
console.log(services);
  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString("en-US", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const updateServices = () => {
    const formattedServices = services.map((service, index) => ({
      ...service,
      number: index + 1,
      createdAt: formatCreatedAt(service.createdAt),
      updatedAt: formatCreatedAt(service.updatedAt),
    }));
    setAllServices(formattedServices);
    setFilteredProducts(formattedServices);
  };

  useEffect(() => {
    if (services.length > 0) {
      updateServices();
    }
  }, [services]);

  const [allServices, setAllServices] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const filterDocuments = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);

    const filtered = allServices.filter((service) => {
      return service.title.toLowerCase().includes(value);
    });

    setFilteredProducts(filtered);
  };
  const onRowEditComplete = async (e) => {
    let { newData } = e;
    let id = newData._id;
    delete newData._id;
    delete newData.createdAt;
    delete newData.updatedAt;
    // await dispatch(updateUserAction({ _id: id, userData: newData })).unwrap().then(()=>{
    //     toast.success("User updated Successfully"); 
    // }).catch((backendError) => {
    //   console.log(backendError);
    //   toast.error(backendError.error);
    // });
    // await dispatch(getAllUsers());
  };

  
 

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };


  const deleteService=async(serviceId)=>{
    try{
      await dispatch(deleteServiceAction({_id:serviceId})).unwrap()
      .then(()=>{ toast.success(`Service deleted successfully`)
      dispatch(getAllServices())});
    
    }
    catch(backError){
      toast.error(backError.error)
    }
  }



  const deleteButtonTemplate = (rowData) => {
    let id = rowData._id;
    return (
      <button
        onClick={() => deleteService(id)}
        className="border-0 bg-transparent"
        style={{ color: "#EC0B0B" }}
      >
        Delete
      </button>
    );
  };

  return (
    <div
      className="col-12 m-auto p-fluid py-4 px-5 mb-4"
      style={{ borderRadius: "15px", backgroundColor: "#fff" }}
    >
      <div className="d-flex justify-content-between">
        <div className="col-7">
          <h2
            className="ms-2 mt-2"
            style={{ color: "#4A5568", fontSize: "25px" }}
          >
            All services
          </h2>
        </div>
        <div className="position-relative mb-3 col-4 me-3">
          <FontAwesomeIcon
            className="fs-5 position-absolute"
            icon={faSearch}
            style={{ top: "12px", left: "13px", color: "#9098b1" }}
          />
          <InputText
            className="py-2 px-5 "
            placeholder="Search list..."
            value={filterValue}
            onChange={filterDocuments}
          />
        </div>
      </div>
      <DataTable
        value={filteredProducts}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        tableStyle={{ minWidth: "50rem" }}
        style={{ fontSize: "18px" }}
        resizableColumns
        sortField="date"
        sortOrder={-1}
        paginator
        rows={5} 
      >
        <Column
          field="number"
          header="#"
          editor={(options) => textEditor(options)}
          style={{ width: "5%", height: "80px" , padding:'0 20px'}}
        ></Column>
        <Column
          field="title"
          header="service"
          editor={(options) => textEditor(options)}
          style={{ width: "25%" }}
        ></Column>

        <Column
          field="serial_code"
          header="Serial-code"
          editor={(options) => textEditor(options)}
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="status"
          header="status"
          style={{ width: "25%" }}
        ></Column>

        <Column
          field="user"
          header="user"
          editor={(options) => textEditor(options)}
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="updatedAt"
          header="last Update"
          sortable
          editor={(options) => textEditor(options)}
          style={{ width: "30%" }}
        ></Column>
               <Column
          header="Actions"
          body={deleteButtonTemplate}
          style={{ width: "25%" }}
          headerStyle={{ width: "25%", minWidth: "8rem" }}
        />
      </DataTable>
    </div>
  );
}
