import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

class Logout extends Component {
  render() {
    const cookies = new Cookies();
    cookies.remove('login');

    if (cookies.get('login') === undefined)
    {
      return <Redirect to="/"/>
    }

    return (
      <div>
        
      </div>
    )
  }
}
export default Logout;