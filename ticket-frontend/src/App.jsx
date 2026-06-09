import {
  BrowserRouter,
  Routes,
  Route
}
from "react-router-dom";

import Navbar
from "./components/Navbar";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import ProtectedRoute
from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard
from "./pages/Dashboard";

import CreateTicket
from "./pages/CreateTicket";

import TicketList
from "./pages/TicketList";

import TicketDetails
from "./pages/TicketDetails";

import Login
from "./pages/Login";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
 path="/register"
 element={<Register />}
/>

<Route
 path="/verify"
 element={<VerifyOtp />}
/>
<Route
 path="/forgot-password"
 element={<ForgotPassword />}
/>

<Route
 path="/reset-password"
 element={<ResetPassword />}
/>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-ticket"
          element={
            <ProtectedRoute>
              <CreateTicket />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ticket/:id"
          element={
            <ProtectedRoute>
              <TicketDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;