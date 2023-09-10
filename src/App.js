import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./components/core/Auth/SignUp";
import Login from "./components/core/Auth/Login";
import NavBar from "./components/Common/NavBar";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import Aboutus from "./Pages/Aboutus";
import ContactUs from "./Pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Settings from "./components/core/Dashboard/Settings/Settings";
import Error from "./Pages/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/Constants";
import MyCourses from "./components/core/Dashboard/MyCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import ViewCourse from "./Pages/ViewCourse";
import Instructor from "./components/core/Dashboard/InstructorDashBoard/Instructor";

function App() {

  const {user} = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">

      <NavBar/>

      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<Aboutus/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/verify-email" element={<VerifyEmail/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/reset-password/:id" element={<UpdatePassword/>} />
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/catalog/:catalogName" element={<Catalog/>}/>
          <Route path="/courses/:courseId" element={<CourseDetails/>}/>
          <Route
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }>
            <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="/dashboard/settings" element={<Settings/>}/>
            {/* Route only for Students */}
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />}/>
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )}

            {/* Route only for Instructors */}
            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/instructor" element={<Instructor/>}/>
                <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
                <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                />
              </>
            )}
          </Route>

          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
          
          
        {/* 404 Page */}
        <Route path="*" element={<Error />} />
      </Routes>

    </div>
  );
}

export default App;
