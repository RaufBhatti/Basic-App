import { Switch, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Users from './components/Users';
import Dashboard from "./components/Dashboard";
import ProductDetails from "./components/ProductDetails";
import EditProduct from "./components/EditProduct";
import EditUser from "./components/EditUser";
import AddProduct from "./components/AddProduct";
import Airways from "./components/Airways";
import Home from "./components/Home";

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <>
      <Navbar email={user.email} role={user.role} setLoginUser={setLoginUser} />
      <Switch>
        <Route exact path='/'>{user && user._id && user.role === 'Admin' ? <Dashboard setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />}</Route>
        <Route path='/home'>{user && user._id ? <Home setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />}</Route>
        <Route exact path='/Airways/:country'>{user && user._id && user.role === 'Admin' ? <Airways setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />}</Route>
        <Route path='/products'>{user && user._id ? <Products userRole={user.role} /> : <Login setLoginUser={setLoginUser} />}</Route>
        <Route path='/ProductDetails'>{user && user._id ? <ProductDetails userRole={user.role} /> : <Login setLoginUser={setLoginUser} />}</Route>
        <Route path='/EditProduct/:id'>{user && user._id && (user.role === 'Admin' || user.role === 'Operator' || user.role === 'Manager') ? <EditProduct /> : <Login setLoginUser={setLoginUser} />}</Route>
        <Route path='/users'>{user && user._id && (user.role === 'Admin') ? <Users /> : <Login setLoginUser={setLoginUser} />}</Route>
        <Route path='/EditUser/:id'>{user && user._id && (user.role === 'Admin') ? <EditUser /> : <Login setLoginUser={setLoginUser} />}</Route>
        <Route path='/login'>
          <Login setLoginUser={setLoginUser} />
        </Route>
        <Route path='/register' ><Register userRole={user.role} /></Route>
        <Route path='/addProduct' >{user && user._id ? <AddProduct userRole={user.role} /> : <Login setLoginUser={setLoginUser} />}</Route>
        <Redirect from='*' to='/' />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
