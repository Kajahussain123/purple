import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ViewUsers from './Pages/Users/ViewUsers';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import ViewVendors from './Pages/Vendors/ViewVendors';
import ViewOrders from './Pages/Orders/ViewOrders';
import VendorDetails from './Pages/Vendors/VendorDetails';

const App = () => {
  const location = useLocation(); 

  const isLoginPage = location.pathname === '/admin-login';

  return (
    <div style={appStyle}>
      {/* Conditionally render Sidebar and Header */}
      {!isLoginPage && <Sidebar />}
      <div style={contentStyle}>
        {!isLoginPage && <Header />}
        <div style={mainStyle}>
          <Routes>
           
            <Route path="/view-vendors" element={<ViewVendors />} />
            <Route path="/vendor-details/:id" element={<VendorDetails />} />


          </Routes>
        </div>
      </div>
    </div>
  );
};

const appStyle = {
  display: 'flex',
  height: '100vh', 
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1, 
};

const mainStyle = {
  padding: '20px',
  flexGrow: 1, 
  overflowY: 'auto', 
  backgroundColor: '#f5f5f5', 
};

export default App;
