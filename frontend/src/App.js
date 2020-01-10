import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Route } from 'react-router-dom';
import Checkout from './component/Checkout';
import Content from './component/Content';
import Dashboard from './component/Dashboard';
import Edit_iklan from './component/Edit_iklan';
import Footer from './component/Footer';
import Header from './component/Header';
import Invoice from './component/Invoice';
import Login from './component/Login';
import Logout from './component/Logout';
import Pasang_iklan from './component/Pasang_iklan';
import Products from './component/Products';
import Product_detail from './component/Product_detail';
import Profile from './component/Profile';
import Register from './component/Register';
import Wishlist from './component/Wishlist';

var globalState = {
  login: false,
  id: null
}

// const createStore = redux.createStore;
const rootReducer = (state = globalState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...globalState,
        login: true,
        id: action.id
      }
    case 'LOGOUT':
      return {
        ...globalState
      }
    default: return state
  }
}


const store = createStore(rootReducer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <Route exact path="/" component={Content} />
          <Route path="/Wishlist" component={Wishlist} />
          <Route path="/Checkout" component={Checkout} />
          <Route path="/Invoice" component={Invoice} />
          <Route path="/Login" component={Login} />
          <Route path="/Product_detail" component={Product_detail} />
          <Route path="/Products" component={Products} />
          <Route path="/Register" component={Register} />
          <Route path="/Logout" component={Logout} />
          <Route path="/Pasang_iklan" component={Pasang_iklan} />
          <Route path="/Profile" component={Profile} />
          <Route path="/Dashboard" component={Dashboard} />
          <Route path="/Edit_iklan" component={Edit_iklan} />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default App;