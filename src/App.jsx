import "./App.css";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./Redux/Slice/userSlice.jsx";
import Spinner from "./components/Spinner/Spinner.jsx";
import ChatPage from "./Pages/ChatPage.jsx";

const Footer = lazy(() => import("./components/Footer/Footer"));
const Header = lazy(() => import("./components/Header/Header"));
const DetailsBlogs = lazy(() => import("./Pages/Blogs/detailsBlogs"));
const HomePage = lazy(() => import("./Pages/Home/HomePage"));
const AboutPage = lazy(() => import("./Pages/ABout/AboutPage.jsx"));
const Contact = lazy(() => import("./Pages/Contact.jsx"));
const AllUserPage = lazy(() => import("./Pages/Admin/AllUserPage.jsx"));
const AddBlogPage = lazy(() => import("./Pages/Admin/AddBlogPage.jsx"));
const Services = lazy(() => import("./Pages/Services.jsx"));
const Blogs = lazy(() => import("./Pages/Blogs/blogs.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const Register = lazy(() => import("./Pages/Register.jsx"));
const AllServicesAdminPage = lazy(() =>
  import("./Pages/Admin/AllServeices.jsx")
);
const AddUserPage = lazy(() => import("./Pages/Admin/AddUserPage.jsx"));
const CompanyPapersPage = lazy(() =>
  import("./Pages/User/CompanyPapersPage.jsx")
);
const Setting = lazy(() => import("./Pages/Setting.jsx"));
const AllBlogsPage = lazy(() => import("./Pages/Admin/AllBlogPage.jsx"));
const Address = lazy(() => import("./Pages/Address.jsx"));
const ChatApp = lazy(() => import("./components/Chat/ChatApp.jsx"));
const NewRequestPage = lazy(() => import("./Pages/User/newRequestPage.jsx"));
const AllServicesUserPage = lazy(() =>
  import("./Pages/User/AllServicsesUSerPage.jsx")
);
const EditBlog = React.lazy(() => import("./components/EditBlog.jsx"));
const AddServicePage = lazy(() => import("./Pages/Admin/AddServicePage.jsx"));
const ServicePreviewPage = lazy(() => import("./Pages/ServicePreviewPage.jsx"));
const AddPaperPage = lazy(() => import("./Pages/User/AddPapers.jsx"));
const PersonalPage = lazy(() => import("./Pages/User/PersonalPage"));
const PaperDetails = lazy(() => import("./components/PreviewPaper.jsx"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await dispatch(currentUser()).unwrap();
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };

    const delay = 3000;

    const timeoutId = setTimeout(() => {
      checkAuthentication();
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <div className="100%">
      <BrowserRouter>
        <Header />
        <div style={{ minHeight: "78vh" }}>
          
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/About" element={<AboutPage />} />
             
                <Route path="/contact" element={<Contact />} /> 
                <Route path="/Services" element={<Services />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogdetails/:id" element={<DetailsBlogs />} />
                <Route path="/Setting" element={<Setting />} /> 
                <Route path="/address" element={<Address />} /> 
                <Route path="/Login" element={<Login />} />
               
                <Route path="/Signup" element={<Register />} /> 
             
   <Route path="/admin" element={<Outlet />}>
                  <Route path="" element={<AllUserPage />} />
                  <Route path="User" element={<AllUserPage />} />
                  <Route path="new-blog" element={<AddBlogPage />} />
                  <Route path="editblog/:id" element={<EditBlog />} />
                  <Route path="addUSer" element={<AddUserPage />} />
                  <Route path="chat" element={<ChatPage />} />
                  <Route
                    path="AllServices"
                    element={<AllServicesAdminPage />}
                  />
                  <Route path="add-service" element={<AddServicePage />} />
                  <Route path="allblogs" element={<AllBlogsPage />} />
                </Route>
             
             
                <Route
                  path="service-preview/:id"
                  element={<ServicePreviewPage />}
                />
                <Route path="/user" element={<Outlet />}>
                  {" "}
                  {/** still */}
                  <Route path="" element={<CompanyPapersPage />} />
                  <Route path="companyPapers" element={<CompanyPapersPage />} />
                  <Route path="add-paper" element={<AddPaperPage />} />
                  <Route path="preview-paper/:id" element={<PaperDetails />} />
                  <Route path="personal" element={<PersonalPage />} />
                  <Route path="AllServices" element={<AllServicesUserPage />} />
                  <Route
                    path="newRequestService"
                    element={<NewRequestPage />}
                  />
                  <Route
                    path="Chat/:serviceId/:adminId/:userId"
                    element={<ChatApp />}
                  />
                  {/** still */}
                </Route>
              </Routes>
            </Suspense>
       
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
