import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  deleteUserAction,
  getAllUsers,
  updateUserAction,
} from "../Redux/Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AllUsers() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllUsers());
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [dispatch]);

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

  const updateUsers = () => {
    const formattedUsers = users.map((user, index) => ({
      ...user,
      number: index + 1,
      createdAt: formatCreatedAt(user.createdAt),
    }));
    setAllUsers(formattedUsers);
    setFilteredProducts(formattedUsers);
  };

  useEffect(() => {
    if (users.length > 0) {
      updateUsers();
    }
  }, [users]);

  const [allUsers, setAllUsers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const filterDocuments = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);

    const filtered = allUsers.filter((user) => {
      return user.username.toLowerCase().includes(value);
    });

    setFilteredProducts(filtered);
  };
  const onRowEditComplete = async (e) => {
    let { newData } = e;
    let id = newData._id;
    delete newData._id;
    delete newData.createdAt;
    delete newData.updatedAt;
    await dispatch(updateUserAction({ _id: id, userData: newData })).unwrap().then(()=>{
        toast.success("User updated Successfully"); 
    }).catch((backendError) => {
      console.log(backendError);
      toast.error(backendError.error);
    });
    await dispatch(getAllUsers());
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

  const deleteUser = async (id) => {
    try {
      await dispatch(deleteUserAction(id)).unwrap();
      toast.success("User Deleted Successfully");

      await dispatch(getAllUsers());
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error if necessary
    }
  };
  const deleteButtonTemplate = (rowData) => {
    let id = rowData._id;
    return (
      <button
        onClick={() => deleteUser(id)}
        className="border-0 bg-transparent"
        style={{ color: "#EC0B0B" }}
      >
        Delete
      </button>
    );
  };

  return (
    <div
      className="col-12 m-auto  p-fluid py-4 px-5 mb-4"
      style={{ borderRadius: "15px", backgroundColor: "#fff" }}
    >
      <div className="d-flex justify-content-between">
        <div className="col-7">
          <h2
            className="ms-2 mt-2"
            style={{ color: "#4A5568", fontSize: "25px" }}
          >
            All users
          </h2>
        </div>
        <div className="position-relative mb-3 col-4 me-3">
          <FontAwesomeIcon
            className="fs-5 position-absolute"
            icon={faSearch}
            style={{ top: "12px", left: "13px", color: "#9098b1" }}
          />
          <InputText
            className="py-2 px-5"
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
          editor={false}
          style={{ width: "20%", height: "80px", padding: "0 20px" }}
        ></Column>
        <Column
          field="username"
          header="username"
          editor={(options) => textEditor(options)}
          style={{ width: "20%" }}
        ></Column>
        <Column
          field="email"
          header="email"
          editor={(options) => textEditor(options)}
          style={{ width: "20%", height: "55px" }}
        ></Column>
        <Column
          field="createdAt"
          header="date"
          sortable
          editor={false}
          style={{ width: "20%" }}
        ></Column>
        <Column
          rowEditor
          headerStyle={{ width: "10%", minWidth: "8rem" }}
          bodyStyle={{ textAlign: "center" }}
        ></Column>
        <Column
          header="Actions"
          body={deleteButtonTemplate}
          style={{ width: "20%" }}
          headerStyle={{ width: "10%", minWidth: "8rem" }}
        />
      </DataTable>
    </div>
  );
}
