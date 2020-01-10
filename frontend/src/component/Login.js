import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';

const cookies = new Cookies();

class Login extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      status: '',
      username: '',
      password: '',
      login_response: ''
    }
  }

  loginuser = (e) => {
    var self = this;
    axios.post(`http://localhost:8002/loginuser`,
      {
        username: e.username.value,
        password: e.password.value
      }).then((response) => {
        var login_response = response.data
        console.log('login_response', login_response)
        if (login_response !== 0) {
          cookies.set('login', login_response, { path: '/' });
          this.props.handleLogin(login_response)
          this.setState({ login_response })
          self.setState({
            redirect: true
          });
        } else {
          self.setState({
            status: 'Login gagal'
          })
        }
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
  }

  render() {
    return (

      <div>
        {console.log('props', this.props)}
        {this.renderRedirect()}
        <div className="container" style={{ marginTop: 150 }}>
          <div className="row">
            <div className="col-md-6">
              <form>
                <div>
                  <h1 style={{ fontWeight: 'bold' }}>LOGIN</h1>
                </div>
                <div className="form-group" style={{ marginTop: 30 }}>
                  <label htmlFor="exampleInputEmail1">User Name</label>
                  <input type="text" ref="username" className="form-control" placeholder="Masukan Username" />
                  {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" ref="password" className="form-control" placeholder="Masukan Password" />
                </div>
                {/* <div className="form-group form-check" style={{ marginTop: 30 }}>
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button
                  type="button"
                  style={{ marginTop: 10 }}
                  onClick={() => { this.loginuser(this.refs) }}
                  // onClick={this.props.handleLogin}
                  className="btn btn-primary">Login
                </button>
              </form>
            </div>
            <div className="col-md-6" style={{ marginTop: 30 }}>
              <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img className="d-block w-100" src="./img/Gambar 4.jpg" alt="First slide" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block w-100" src="./img/Gambar 5.jpg" alt="Second slide" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block w-100" src="./img/Gambar 6.jpg" alt="Third slide" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    redirect: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: (data) => dispatch({ type: 'LOGIN', id: data })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);