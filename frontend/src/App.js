import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Header from './component/Header';
import Footer from './component/Footer';
import Wishlist from './component/Wishlist';
import Content from './component/Content';
import Checkout from './component/Checkout';
import Invoice from './component/Invoice';
import Login from './component/Login';
import Product_detail from './component/Product_detail';
import Products from './component/Products';
import Register from './component/Register';
import Logout from './component/Logout';
import Pasang_iklan from './component/Pasang_iklan';
import Profile from './component/Profile';
import Dashboard from './component/Dashboard';
import Edit_iklan from './component/Edit_iklan';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" component={Content}/>
        <Route path="/Wishlist" component={Wishlist}/>
        <Route path="/Checkout" component={Checkout}/>
        <Route path="/Invoice" component={Invoice}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Product_detail" component={Product_detail}/>
        <Route path="/Products" component={Products}/>
        <Route path="/Register" component={Register}/>
        <Route path="/Logout" component={Logout}/>
        <Route path="/Pasang_iklan" component={Pasang_iklan}/>
        <Route path="/Profile" component={Profile}/>
        <Route path="/Dashboard" component={Dashboard}/>
        <Route path="/Edit_iklan" component={Edit_iklan}/>
        <Footer />
      </div>
    );
  }
}

export default App;
