import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux'

class Logout extends Component {
  render() {
    const cookies = new Cookies();
    cookies.remove('login');

    if (cookies.get('login') === undefined) {
      this.props.handleLogOut()
      return <Redirect to="/" />
    }

    return (
      <div>

      </div>
    )
  }
}

const mapDispatchToState = (dispatch) => {
  return {
    handleLogOut: () => dispatch({ type: 'LOGOUT' })
  }
}

export default connect(null, mapDispatchToState)(Logout);