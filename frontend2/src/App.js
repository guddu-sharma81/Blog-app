import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Home from "./components/Home";
import About from "./Pages/About";
import Creaters from "./Pages/Creaters";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashbord from "./Pages/Dashbord";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "./Context/AuthProvider";
import Blogs from "./Pages/Blogs";
import UpdateBlog from "./dashboard/UpdateBlog";
import DetailsPage from "./Pages/DetailsPage";
import NoteFound from "./Pages/NoteFound";


function App() {

  const location = useLocation();
  const hideNavbarFooter = ["/dashbord", "/login", "/register"].includes(location.pathname);

  const { blog, isAuthenticated } = useAuth();
  let token = localStorage.getItem("jwt");
  console.log(blog);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/creaters" element={<Creaters />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashbord" element={<Dashbord />} />

        <Route path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="/blog/:id" element={<DetailsPage />} />
        <Route path="*" element={<NoteFound />} />
      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
