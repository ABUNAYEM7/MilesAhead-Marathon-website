import React from 'react'
import MainLayout from '../MainLayout/MainLayout'
import { Routes, Route } from "react-router";
import Home from '../Pages/Home/Home';
import Dashboard from '../Pages/Dashboard.jsx/Dashboard';
import Registration from '../Pages/Registration/Registration';
import Marathons from '../Pages/Marathons/Marathons';
import LogIn from '../Pages/Registration/LogIn';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path ='' element ={<MainLayout/>}>
          <Route index element={<Home/>}></Route>
          <Route path='Marathons' element={<Marathons/>}></Route>
          <Route path='Dashboard' element={<Dashboard/>}></Route>
          <Route path='Registration' element={<Registration/>}></Route>
          <Route path='LogIn' element={<LogIn/>}></Route>

        </Route>
    </Routes>
  )
}

export default MainRoutes
