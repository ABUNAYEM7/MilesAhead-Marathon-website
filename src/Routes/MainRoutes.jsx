import React from 'react'
import MainLayout from '../MainLayout/MainLayout'
import { Routes, Route } from "react-router";
import Home from '../Pages/Home/Home';
import Dashboard from '../Pages/Dashboard.jsx/Dashboard';
import Registration from '../Pages/Registration/Registration';
import LogIn from '../Pages/Registration/LogIn';
import MarathonDetails from '../Pages/DetailsPage/MarathonDetails';
import AllMarathons from '../Pages/Marathons/AllMarathons';
import AddMarathon from '../Pages/Dashboard.jsx/AddMarathon';
import MyMarathonList from '../Pages/Dashboard.jsx/MyMarathonList';
import MyApplyList from '../Pages/Dashboard.jsx/MyApplyList';
import ApplyMarathon from '../Pages/ApplyMarathon/ApplyMarathon';
import NotFound from '../Pages/ErrorPage/NotFound';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path ='/' element ={<MainLayout/>}>
          <Route index element={<Home/>}></Route>
          {/* main-routes */}
          <Route path='/AllMarathons' element={<AllMarathons/>}></Route>
          {/* dashboard-nested-routes */}
          <Route path='/Dashboard' element={<Dashboard/>}>
            <Route index element={<AddMarathon/>}/>
            <Route path='MyMarathonList' element={<MyMarathonList/>}/>
            <Route path='MyApplyList' element={<MyApplyList/>}/>
          </Route>
          <Route path='/Registration' element={<Registration/>}></Route>
          <Route path='/LogIn' element={<LogIn/>}></Route>
          {/* dynamic-routes */}
          <Route path='/details/:id' element={<MarathonDetails/>} />
          <Route path='/apply-marathon/:id' element={<ApplyMarathon/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
    </Routes>
  )
}

export default MainRoutes
