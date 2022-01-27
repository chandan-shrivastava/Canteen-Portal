import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Profile from "./components/users/Profile";
import ProfileEdit from "./components/users/ProfileEdit";
import FoodMenu from "./components/users/FoodMenuDashboard";
import FoodItem from "./components/users/AddFoodItem";
import Login from "./components/common/Login";
import FoodItems from "./components/users/FoodItems";
import PlaceOrder from "./components/users/PlaceOrder";
import BuyerOrders from "./components/users/BuyerOrders";
import VendorOrders from "./components/users/VendorOrders";
import EditFoodItem from "./components/users/EditFoodItem";
import Rating from "./components/users/Rating";
import Stats from "./components/users/stats";

const Layout = () => {
  return (
    <div>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<ProfileEdit />} />
          <Route path="vendor/foodmenu" element={<FoodMenu />} />
          <Route path="buyer/fooditems" element={<FoodItems />} />
          <Route path="vendor/addfood" element={<FoodItem />} />
          <Route path="buyer/placeorder" element={<PlaceOrder />} />
          <Route path="buyer/orders" element={<BuyerOrders />} />
          <Route path="vendor/orders" element={<VendorOrders />} />
          <Route path="vendor/editfood" element={<EditFoodItem />} />
          <Route path="buyer/rating" element={<Rating />} />
          <Route path="vendor/stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
