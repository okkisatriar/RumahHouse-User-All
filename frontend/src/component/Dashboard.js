import axios from 'axios';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

class Dashboard extends Component {
  state = {
    datadashboard: [],
    idUser: ''
    // posting: '',
    // harga: ''
  }

  componentDidMount = () => {
    var id_user = cookies.get("login");
    console.log('id', cookies)
    this.setState({ idUser: id_user })
    this.getDetailDasboard(id_user)
  }

  getDetailDasboard = (id_user) => {
    axios.post('http://localhost:8002/datadashboard/' + id_user).then((getData) => {
      console.log(getData.data)
      this.setState({
        datadashboard: getData.data
      });
    })
  }

  hapusdatadashboard = (event) => {
    axios.post(`http://localhost:8002/hapusdatadashboard`,
      {
        id: event
      }
    ).then((response) => {
      console.log(response)
      this.getDetailDasboard(this.state.idUser)
    })
  }

  render() {

    if (cookies.get('login') === undefined) {
      return <Redirect to='/' />
    }

    const listdashboard = this.state.datadashboard.map((isi, index) => {
      var urutan = index + 1;
      var id = isi.id;
      var posting = isi.posting;
      var harga = isi.harga;
      var foto_produk = isi.foto_produk;
      return <tr key={index}>
        <td>{urutan}</td>
        <td><img src={'http://localhost:8002/tampungfile/' + foto_produk} width={65} height={50} />&nbsp; &nbsp;{posting}</td>
        <td>IDR {harga} </td>
        <td>
          <Link
            to={{ pathname: '/Edit_iklan/', state: { id: id } }}
            className="btn btn-warning"><i className="fa fa-pencil"></i>Edit
          </Link>&nbsp;
          <button
            onClick={() => this.hapusdatadashboard(id)}
            className="btn btn-danger btn-md">
            <i className="fa fa-trash" />Hapus
          </button>&nbsp;
        </td>
      </tr>
    })

    return (
      <div>
        {/* TITLE */}
        <div style={{ textAlign: 'center', marginTop: 75 }}>
          <h3 style={{ fontWeight: 'bold' }}>DASHBOARD</h3>
        </div>
        {/* DETAIL */}
        <div className="container" style={{ marginTop: 50 }}>
          <div className="row">
            <div className="col-md-2">
              <h4>Iklan Saya</h4>
            </div>
            <div className="col-md-8" />
            <div className="col-md-2">
              <Link to="/Pasang_iklan"><button type="button" className="btn btn-success btn-lg">+ Iklan Baru</button></Link>
            </div>
          </div>
        </div>
        {/* Nav */}
        <div className="container">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active show" data-toggle="tab" href="#home">Iklan</a>
            </li>
          </ul>
          {/* Nav Home */}
          <div id="myTabContent" className="tab-content">
            <div className="tab-pane fade active show" id="home">
              {/* Table */}
              <table className="table table-hover" style={{ marginTop: 30 }}>
                <thead style={{ padding: 30 }}>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Properti</th>
                    <th scope="col">Harga</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listdashboard}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default Dashboard;