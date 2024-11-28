import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from './pages/dashboard/Dashboard';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import EditMenu from './pages/dashboard/edit/EditMenu';
import ViewMenu from './pages/dashboard/view/ViewMenu';
import Info from './pages/dashboard/info/Info';
import FetchMenu from './pages/fetchmenu/FetchMenu';
import LandingApp from './pages/landing/LandingApp'
import HeaderLan from './pages/landing/HeaderLan';
import PerProduct from './pages/fetchmenu/PerProduct'
import RestaurantInfo from './pages/fetchmenu/MenuInfo';
import BusinessInfo from './pages/dashboard/info/BusinessInfo';
import UploadLogo from './pages/dashboard/info/UploadLogo';
import Subscription from './pages/dashboard/subscription/Subscription';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* navbar */}
          <Route element={<HeaderLan />}>
            <Route path='/' index element={<LandingApp />} />
          </Route>
          {/* user login/register */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          {/*fetch menu edit/update/delete */}
          <Route path="/:restaurant/:category/:product" element={<PerProduct />} />
          <Route path="/:restaurant/:category" element={<FetchMenu />} />
          <Route path="/:restaurant" element={<FetchMenu />} />
          <Route path="/:restaurant/info" element={<RestaurantInfo />} />
          {/* Dashboard /info/edit/view */}
          <Route path='dashboard' element={<DashboardLayout />}>
            <Route index element={<Navigate to="info" />} />
            <Route path='edit' element={<EditMenu />} />
            <Route path='view' element={<ViewMenu />} />
            <Route path='subscription' element={<Subscription/>}/>

            <Route path='info' element={<Info />} >
              <Route index element={<BusinessInfo />} />
              <Route path='logo' element={<UploadLogo />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
