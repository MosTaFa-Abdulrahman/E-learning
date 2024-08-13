import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdminLayout, UserLayout } from "./layouts/adminUserLayout";
import { ProtectedRoute, AdminProtectedRoute } from "./layouts/ProtectedRoute";

// Admin Components
import HomeAdmin from "./pages/admin/home/HomeAdmin";
import Users from "./pages/admin/users/Users";
import User from "./pages/admin/user/User";
import Courses from "./pages/admin/courses/Courses";
import Sections from "./pages/admin/sections/Sections";
import Videos from "./pages/admin/videos/Videos";
import Quizzs from "./pages/admin/quizzs/Quizzs";

// User Components
import Home from "./pages/home/Home";
import CoursesUser from "./pages/coursesUser/CoursesUser";
import SingleCourse from "./pages/singleCourse/SingleCourse";
import Profile from "./pages/profile/Profile";
import Quizzes from "./pages/quizzes/Quizzes";
import SingleQuiz from "./pages/singleQuize/SingleQuiz";

// User && Admin
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UpdatePassword from "./pages/login/UpdatePassword";
import NotFound from "./components/notFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "/", element: <Home /> }, // Home page accessible to everyone
      { path: "course/:id", element: <SingleCourse /> },
      { path: "profile/:id", element: <Profile /> },
      { path: "courses", element: <CoursesUser /> },
      { path: "quizzes", element: <Quizzes /> },
      // Protected route for SingleQuiz
      {
        path: "quiz/:id",
        element: <ProtectedRoute />,
        children: [{ path: "", element: <SingleQuiz /> }],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "", element: <HomeAdmin /> },
          { path: "users", element: <Users /> },
          { path: "user/:id", element: <User /> },
          { path: "courses", element: <Courses /> },
          { path: "sections", element: <Sections /> },
          { path: "videos", element: <Videos /> },
          { path: "quizzs", element: <Quizzs /> },
        ],
      },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/update-password", element: <UpdatePassword /> },
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
