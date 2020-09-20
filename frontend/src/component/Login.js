import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Modal from './Modal';

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

  loginUser = (event) => {
    axios.post(`http://localhost:8002/loginuser`, {
      username: event.username.value,
      password: event.password.value
    }).then((response) => {
      var login_response = response.data
      if (login_response > 0) {
        cookies.set('login', login_response, { path: '/' });
        //this.props.handleLogin(login_response)
        this.setState({
          status: login_response,
          redirect: true
        })
      } else {
        this.setState({
          status: login_response
        })
      }
    })
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/" />
      )
    } else {
      return (
        <div>
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

                  {/* Button trigger modal */}
                  <button
                    type="button"
                    data-toggle="modal"
                    style={{ marginTop: 10 }}
                    className="btn btn-primary"
                    onClick={() => this.loginUser(this.refs)}
                    data-target="#exampleModal">Login
                  </button>

                  {/* Modal */}
                  {/* <div classNameS="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          ...
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  
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
}

const mapStateToProps = (state) => {
  return {
    redirect: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   // handleLogin: (data) => {dispatch({ type: 'LOGIN', id: data }), localStorage.setItem('id', data )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);