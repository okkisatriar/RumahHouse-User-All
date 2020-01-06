import React, { Component } from 'react'
import {Link, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Checkout extends Component {
  state = {
    datacheck: [],
    namadepan: '',
    email: '',
    handphone: '',
    alamat: ''
  }

  // Fungsi Join Database
  componentWillMount = () => {
    axios.get('http://localhost:8002/datacheck').then((getData) => {
      console.log(getData.data)
      this.setState({
        datacheck: getData.data
      });
    });
    console.log(this.state.datacheck)
  }

  // Fungsi Menampilkan Databae User dan di tampilkan Di Form
  componentDidMount =() => {
    var id_user = cookies.get("login");
    axios.get('http://localhost:8002/grabdatauser/'+id_user).then(
      (hasilAmbil) => {
        console.log(hasilAmbil.data);
        this.setState({
            id: hasilAmbil.data[0].id,
            namadepan: hasilAmbil.data[0].namadepan,
            email: hasilAmbil.data[0].email,
            handphone: hasilAmbil.data[0].handphone,
            alamat: hasilAmbil.data[0].alamat
        });
        
    });
}
  render() {

    if (cookies.get('login') === undefined)
    {
      return <Redirect to='/'/>
    }

    const listcheck = this.state.datacheck.map((isi, index) => {
      var urutan = index + 1;
      var id_user =isi.id_user;
      var id = isi.id;
      var posting= isi.posting;
      var harga = isi.harga;
      var fotocheck = isi.foto_produk;
      console.log(id)
      return <tr>
                <td>{urutan}</td>
                <td><img src={'http://localhost:8002/tampungfile/'+fotocheck} width={65} height={50} />{posting}</td>
                <td>IDR {harga} </td>
              </tr>
    })  
         
    return (
      <div>
        {/* TITLE */}
        <div style={{textAlign: 'center', marginTop: 75}}>
          <h3 style={{fontWeight: 'bold'}}>CHECKOUT</h3>
        </div>
        {/* DETAIL */}
        <div className="container">
          <table className="table table-hover" style={{backgroundColor: 'rgb(211, 207, 205)', marginTop: 30}}>
            <thead style={{padding: 30}}>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Properti</th>
                <th scope="col">Harga</th>
              </tr>
            </thead>
            <tbody>
              {listcheck}
            </tbody>
          </table> 
        </div>
        <div className="container" style={{marginTop: 80}}>
          <div className="row">
            <div className="col-md-4" style={{backgroundColor: 'rgb(211, 207, 205)'}}>
              <div style={{marginTop: 20, padding: 20}}>
                <h4>Informasi Pembeli</h4>
                <div>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#home">Default</a>
                    </li>
                    <li className="nav-item active show">
                      <a className="nav-link" data-toggle="tab" href="#profile">Edit</a>
                    </li>
                  </ul>
                  <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade" id="home">
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="namadepan">Nama Depan</label>
                          <input type="text" className="form-control" defaultValue={this.state.namadepan} disabled/>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="inputEmail4">Email</label>
                          <input type="email" className="form-control" id="inputEmail4" defaultValue={this.state.email} disabled/>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="handphone">No. Handphone</label>
                        <input type="text" className="form-control" id="handphone" defaultValue={this.state.handphone} disabled/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputAddress">Alamat</label>
                        <input type="text" className="form-control" id="inputAddress" defaultValue={this.state.alamat} disabled/>
                      </div>
                    </div>
                    <div className="tab-pane fade active show" id="profile">
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="namadepan">Nama Depan</label>
                          <input type="text" className="form-control" defaultValue={this.state.namadepan} />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="inputEmail4">Email</label>
                          <input type="email" className="form-control" defaultValue={this.state.email} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="handphone">No. Handphone</label>
                        <input type="text" className="form-control" defaultValue={this.state.handphone} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="inputAddress">Alamat</label>
                        <input type="text" className="form-control" defaultValue={this.state.alamat} />
                      </div>
                    </div>    
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3" />
            <div className="col-md-5">
              <div className="col-md-12" style={{textAlign: 'center', padding: 30, backgroundColor: 'rgb(211, 207, 205)'}}>
                <h3>Payment Method</h3><br /><p><b>Bank Mandiri Transfer - 1310093028308</b></p><table className=" container table">
                  <thead>                        
                  </thead>
                  <tbody>
                    <tr>
                      <td>SUBTOTAL</td>
                      <td>IDR 220.000</td>
                    </tr>
                    <tr>
                      <td>Tax 10%</td>
                      <td>IDR 50.000</td>
                    </tr>
                    <tr>
                      <td>TOTAL</td>
                      <td>IDR 270.000</td>
                    </tr>
                  </tbody>
                </table>
                <Link to="/Invoice"><button type="button" className="btn btn-success">CHECKOUT</button></Link>
              </div>           
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Checkout;