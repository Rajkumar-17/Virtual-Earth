import {BrowserRouter, Routes, Route} from "react-router-dom";

import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import {Login } from "./pages/Login";
import {Logout } from "./pages/Logout";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer/Footer";


import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminContacts } from "./pages/AdminContacts";
import { AdminUpdate } from "./pages/AdminUpdate";
import { AdminService } from "./pages/AdminService";
import { AdminServiceUploade } from "./pages/AdminServiceUpload";

const App =() => {
  return <>
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/service" element={<Service />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Error />} />
      <Route path="/admin/uploads" element={<AdminServiceUploade/>}/>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="users" element={<AdminUsers/>} />
        <Route path="users/edit/:id" element={<AdminUpdate/>}/>
        <Route path="contacts" element={<AdminContacts/>}/>
        <Route path="services" element={<AdminService/>} />
      </Route>
    </Routes>
    <Footer />
  </BrowserRouter>
  </>
}

export default App;