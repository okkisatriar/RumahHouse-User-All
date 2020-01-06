import axios from 'axios';
import React, { Component } from 'react';

class Register extends Component {
  registeruser = (e) => {
    axios.post(`http://localhost:8002/registeruser/`,
      {
        namadepan: e.namadepan.value,
        username: e.username.value,
        email: e.email.value,
        password: e.password.value,
        handphone: e.handphone.value,
        alamat: e.alamat.value

        // kota: e.kota.value,
        // negara: e.negara.value
      }

    );

  }
  render() {
    return (
      <div>
        <div className="container" style={{ marginTop: 80 }}>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6" style={{ backgroundColor: 'rgb(192, 188, 181)', padding: 30, borderRadius: '1%' }}>
              <div className="panel-heading">
                <h3><b>Registrasi</b></h3>
              </div>
              <div className="panel-body">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="namadepan">Nama Depan</label>
                      <input type="text" ref="namadepan" className="form-control" placeholder="Okki Satria" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="username">Username</label>
                      <input type="text" ref="username" className="form-control" placeholder="okki_satria" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputEmail4">Email</label>
                      <input type="email" ref="email" className="form-control" id="inputEmail4" placeholder="@gmail" />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputPassword4">Password</label>
                      <input type="password" ref="password" className="form-control" id="inputPassword4" placeholder="Password" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="handphone">No. Handphone</label>
                    <input type="text" ref="handphone" className="form-control" id="handphone" placeholder={+6280000000000} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputAddress">Alamat</label>
                    <input type="text" ref="alamat" className="form-control" id="inputAddress" placeholder="Sudirman, Setia Budi" />
                  </div>
                  {/* <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">Kota</label>
                    <input type="text" ref="kota" className="form-control" id="inputCity" placeholder="Jakarta" />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">Negara</label>
                    <select id="inputState" className="form-control">
                      <option selected>Pilih...</option>
                      <option>Indonesia</option>
                    </select>
                  </div>
                  <div className="form-group col-md-2">
                    <label htmlFor="inputZip">Kode Pos</label>
                    <input type="text" className="form-control" id="inputZip" placeholder={10510} />
                  </div>
                </div> */}
                  <div className="form-group">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck" />
                      <label className="form-check-label" htmlFor="gridCheck">Check me out</label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={() => this.registeruser(this.refs)}>Daftar</button>
                </form>
              </div>
            </div>
            <div className="col-md-3" />
          </div>
        </div>
      </div>
    )
  }
}
export default Register;