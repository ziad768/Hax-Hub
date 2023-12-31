import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getAllServices } from "../Redux/Slice/serviceSlice";
import { fetchAdminChatsAction } from "../Redux/Slice/userSlice";

export default function AdminChat() {
  const dispatch = useDispatch();
  const { user: currentUser, chats } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAdminChatsAction("fff"));
  }, []);

  console.log(chats);
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
    const formattedServices = chats.map((chat, index) => ({
      ...chat,
      number: index + 1,
      createdAt: formatCreatedAt(chat.firstMessageCreatedAt),
      updatedAt: formatCreatedAt(chat.lastMessageUpdatedAt),
    }));
    setAllServices(formattedServices);
    setFilteredProducts(formattedServices);
  };

  useEffect(() => {
    if (chats.length > 0) {
      updateServices();
    }
  }, [chats]);

  const [allServices, setAllServices] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const filterDocuments = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);

    const filtered = allServices.filter((service) => {
      return chats.title.toLowerCase().includes(value);
    });

    setFilteredProducts(filtered);
  };

  const navigate = useNavigate();
const openChat =(option)=>{
    let serviceId=option.service._id
    let userId = option.user._id
    let adminId = option.admin._id

    console.log({serviceId, userId, adminId});
    navigate( `/user/Chat/${serviceId}/${adminId}/${userId}`);
}
  return (
    <div
      className="col-12 m-auto p-fluid py-4 px-5 mb-4"
      style={{ borderRadius: "15px", backgroundColor: "#fff" }}
    >
      <div className="d-flex justify-content-between flex-wrap">
        <div className="col-12 col-lg-4 my-3">
          <h2
            className="ms-2 mt-2"
            style={{ color: "#4A5568", fontSize: "25px" }}
          >
           Chats
          </h2>
        </div>
        {/* <div className="col-12 col-lg-3 my-3">
          <Link to={"/user/Chat"}>
            <button
              className="ms-2 btn btn-success "
              style={{ color: "", fontSize: "20px" }}
            >
              Chat To Admin
            </button>   
          </Link>
        </div> */}
        <div className="position-relative mb-3 col-12 col-lg-4 my-3 me-3">
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
        // onRowEditComplete={onRowEditComplete}
        tableStyle={{ minWidth: "50rem" }}
        style={{ fontSize: "18px" }}
        resizableColumns
        sortField="updatedAt"
        sortOrder={-1}
        paginator
        rows={5}
      >
        <Column
          field="number"
          header="#"
          // editor={(options) => textEditor(options)}
          style={{ minWidth: "10%", height: "80px", padding: "10px 20px" }}
        ></Column>
        <Column
          field="service.title"
          header="service"
          // editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>

        <Column
          field="user.username"
          header="user"
          // editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>

        <Column
          field="updatedAt"
          header="last update"
          // editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>
        <Column
          field="createdAt"
          header="Created At"
          sortable
          editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>
        <Column
          field=""
          header="Actions"
          body={(option) => 
          (  
            <td>
              {" "}
              <button
                className="btn btn-success"
                onClick={() => {openChat(option)}}
              >
                See
              </button>
            </td>
          )}
          editor={(options) => textEditor(options)}
          style={{ minWidth: "10%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
