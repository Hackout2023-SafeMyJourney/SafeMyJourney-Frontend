import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Home from "./screen/Home";
import Login from "./screen/Login";
import Logout from "./component/Logout";
import Register from "./screen/Register";
import { FillInfo as DriverFillInfo } from "./screen/Driver/FillInfo";
import { FillInfo as PassengerFillInfo } from "./screen/passenger/FillInfo";
import ScanQR from "./screen/passenger/ScanQR";
import LiveStatus from "./screen/LiveStatus";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="register" element={<Register />} />

      <Route path="/passenger">
        <Route index element={<ScanQR />} />
        <Route path="fillinfo" element={<PassengerFillInfo />} />
      </Route>

      <Route path="/driver">
        <Route index element={<DriverFillInfo />} />
      </Route>
      <Route path="/location" element={<LiveStatus />} />
    </Route>
  )
);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
