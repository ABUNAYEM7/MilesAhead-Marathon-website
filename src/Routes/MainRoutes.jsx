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
import PrivateRoute from '../Pages/PrivateRoute/PrivateRoute';
import AboutUs from '../Pages/AboutUS/AboutUs';
import UserDonation from '../Pages/UserDonation/UserDonation';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path ='/' element ={<MainLayout/>}>
          <Route index element={<Home/>}></Route>
          {/* main-routes */}
          <Route path='/AllMarathons' element={<PrivateRoute><AllMarathons/></PrivateRoute>}></Route>
          {/* dashboard-nested-routes */}
          <Route path='/Dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}>
            <Route index element={<PrivateRoute><AddMarathon/></PrivateRoute>}/>
            <Route path='MyMarathonList' element={<PrivateRoute><MyMarathonList/></PrivateRoute>}/>
            <Route path='MyApplyList' element={<MyApplyList/>}/>
          </Route>
          <Route path='/about-us' element={<AboutUs/>} />
          <Route path='/Registration' element={<Registration/>}></Route>
          <Route path='/LogIn' element={<LogIn/>}></Route>
          {/* dynamic-routes */}
          <Route path='/details/:id' element={<PrivateRoute><MarathonDetails/></PrivateRoute>} />
          <Route path='/apply-marathon/:id' element={<PrivateRoute><ApplyMarathon/></PrivateRoute>}/>
          {/* donation-route */}
          <Route path='/user-donation' element={<PrivateRoute><UserDonation/></PrivateRoute>}/>
          <Route path='*' element={<NotFound/>}/>
        </Route>
    </Routes>
  )
}

export default MainRoutes
