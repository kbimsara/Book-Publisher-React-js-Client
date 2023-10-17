import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import CreateAcc from './Pages/CreateAcc'
import AdminHome from './Pages/Admin/AdminHome'
import Logout from './Pages/Admin/Logout'
import Publish from './Pages/Admin/Publish'
import AdminEditBook from './Pages/Admin/AdminEditBook'

export default function LinkRouters() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/createacc" element={<CreateAcc />} />
                <Route path="/adminHome" element={<AdminHome />} />
                <Route path="/createbk" element={<Publish />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/edit/book/:id" element={<AdminEditBook />} />
                <Route path="/edit/book/adminHome" element={<AdminHome />} />
                <Route path="/edit/book/createbk" element={<Publish />} />
            </Routes>
        </Router>
    )
}
