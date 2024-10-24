import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import SignUp from './pages/signup';
import AdminHeader from './components/adminheader';
import Dashboard from './pages/dashboard';
import SponsorBond from './pages/sponsorbond';
import Mission from './pages/mission';
import { MissionListProvider } from './contextAPI/missionListing';
import { BondListProvider } from './contextAPI/bondListing';
import DashboardHeader from './components/dasboardheader';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: 
      <AdminHeader>
        <MissionListProvider>
        <BondListProvider>
        <Dashboard />
        </BondListProvider>
        </MissionListProvider>
        </AdminHeader>
   ,
  },
  {
    path: "/sponsorbond",
    element: 
    <BondListProvider>
      <MissionListProvider>

   
    <DashboardHeader>
      <SponsorBond />
      </DashboardHeader>
      </MissionListProvider>
      </BondListProvider>,
  },
  {
    path: "/mission",
    element: <MissionListProvider>
      <BondListProvider>

     
      <DashboardHeader>
      <Mission />
     </DashboardHeader> 
     </BondListProvider>
     </MissionListProvider>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
