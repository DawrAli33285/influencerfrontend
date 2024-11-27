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

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import AdminHeader from './components/adminheader';
import Dashboard from './pages/dashboard';
import SponsorBond from './pages/sponsorbond';
import Mission from './pages/mission';
import { MissionListProvider } from './contextAPI/missionListing';
import { BondListProvider } from './contextAPI/bondListing';
import DashboardHeader from './components/dasboardheader';
import SignIn from './pages/signin';
import Verification from './pages/verificationpage';
import SellerAdminHeader from './components/sellercomponents/selleradmin';
import SellerDashboard from './pages/sellerdashboard';
import Market from './pages/market';
import MyBond from './pages/mybond';
import Paymet from './pages/transaction';
import InfluencerOffer from './pages/Influenceroffer';
import { loadStripe } from '@stripe/stripe-js';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import ExchangeRegistration from './components/sellercomponents/ExchangeRegistration';
import Bid from './components/sellercomponents/Bid';
import NewIndex from './pages/newindex';
import AboutUs from './pages/aboutus';
import HowItWorks from './pages/howitworks';
import FAQ from './pages/faq';
import Terms from './pages/termsandcondition';
import ViewBond from './pages/viewbond';
import Inbox from './pages/inbox';
import Settings from './pages/settings';
import Billing from './pages/billing';
import Invoice from './pages/invoice';
import BuyerViewBond from './pages/buyerviewbond';
import BuyerMission from './pages/buyermission';
import Search from './pages/search';
import Profile from './pages/profile';


const stripePromise = loadStripe('pk_test_51QGEijKlyiNy12v1UO9k3XBkKygr92N4wtlUfBGwnLxQ5yeGZVujSaI0q99D3TkxM7OUi1l7iEVj9P3ZRaBNvyBv00QNaWLH2L');

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewIndex />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/howitworks",
    element: <HowItWorks />
  },
  {
    path: "/faq",
    element: <FAQ />
  },
  {
    path: "/terms",
    element: <Terms />
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/verification",
    element: <Verification />,
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

  },
  {
    path: "/inbox",
    element:
      <SellerAdminHeader>
        <MissionListProvider>
          <BondListProvider>
            <Inbox />
          </BondListProvider>
        </MissionListProvider>
      </SellerAdminHeader>
  },
  {
    path: "/settings",
    element:
      <AdminHeader>
        <MissionListProvider>
          <BondListProvider>
            <Settings />
          </BondListProvider>
        </MissionListProvider>
      </AdminHeader>
  },
  {
    path: "/billing",
    element:
      <AdminHeader>
        <MissionListProvider>
          <BondListProvider>
            <Billing />
          </BondListProvider>
        </MissionListProvider>
      </AdminHeader>
  },
  {
    path: "/promisebonddetail/:id",
    element:
      <AdminHeader>
        <MissionListProvider>
          <BondListProvider>
            <ViewBond />
          </BondListProvider>
        </MissionListProvider>
      </AdminHeader>

  },
  {
    path: "/invoice/:id",
    element:
      <AdminHeader>
        <MissionListProvider>
          <BondListProvider>
            <Invoice />
          </BondListProvider>
        </MissionListProvider>
      </AdminHeader>

  },
  {
    path: "/sponsorbond",
    element:
      <BondListProvider>
        <MissionListProvider>


          <AdminHeader>
            <SponsorBond />
          </AdminHeader>
        </MissionListProvider>
      </BondListProvider>,
  },
  {
    path: "/mission",
    element: <MissionListProvider>
      <BondListProvider>


        <AdminHeader>
          <Mission />
        </AdminHeader>
      </BondListProvider>
    </MissionListProvider>,
  },
  {
    path: "/buyerdashboard",
    element: <SellerAdminHeader>
      <MissionListProvider>
        <BondListProvider>
          <SellerDashboard />
        </BondListProvider>
      </MissionListProvider>
    </SellerAdminHeader>
  },
  {
    path: "/market",
    element: <SellerAdminHeader>
      <MissionListProvider>
        <BondListProvider>
          <Market />
        </BondListProvider>
      </MissionListProvider>
    </SellerAdminHeader>
  },
  {
    path: `/influenceroffer`,
    element: <InfluencerOffer />
  },
  {
    path: "/buyersponsorbond",
    element: <SellerAdminHeader>
      <MissionListProvider>
        <BondListProvider>
          <MyBond />
        </BondListProvider>
      </MissionListProvider>
    </SellerAdminHeader>
  },
  {
    path: "/buyerpromisebonddetail/:id",
    element:
      <SellerAdminHeader>
        <MissionListProvider>
          <BondListProvider>
            <BuyerViewBond />
          </BondListProvider>
        </MissionListProvider>
      </SellerAdminHeader>

  },
  {
    path: "/buyermission",
    element: <MissionListProvider>
      <BondListProvider>


        <SellerAdminHeader>
          <BuyerMission />
        </SellerAdminHeader>
      </BondListProvider>
    </MissionListProvider>,
  },
  {
    path: "/payment",
    element:


      <Paymet />


  },
  {
    path: '/exchange',
    element: <ExchangeRegistration />
  },
  {
    path: '/bid',
    element: <Bid />
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ clientId: "Aeiv6CI9M6IO70akUujuPV6ru2XJ337_GON5oIAAInPBcavq0up_hZl0NFJwcxmf6mk2tgkJX9sPH4zr" }}>

      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </PayPalScriptProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
