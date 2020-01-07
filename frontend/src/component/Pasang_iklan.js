import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import Modal from './Modal';

const cookies = new Cookies();
class Pasang_iklan extends Component {
  state = {
    tarikstatus: [],
    cancel: false
  }

  componentDidMount = () => {
    this.getStatus();
  }

  getStatus = () => {
    axios.post('http://localhost:8002/tarikstatus').then((getData) => {
      this.setState({
        tarikstatus: getData.data
      })
    })
  }

  onchange = (e) => {
    switch (e.target.name) {
      case 'foto_produk':
        this.setState({
          foto_produk: e.target.files[0]
        });
      case 'foto_produk2':
        this.setState({
          foto_produk2: e.target.files[0]
        });
      case 'foto_produk3':
        this.setState({
          foto_produk3: e.target.files[0]
        });
        break;
    }
  }

  handleCancel = () => {
    this.setState({ cancel: true })
  }

  dataiklan = (e) => {
    var posting = e.posting.value;
    var harga = e.harga.value;
    var alamat = e.alamat.value;
    var status = e.status.value;
    var deskripsi = e.deskripsi.value;
    this.setState({
      posting: posting,
      alamat: alamat,
      harga: harga,
      status: status,
      deskripsi: deskripsi
    })
  }

  value = (e) => {
    var id_username = cookies.get('login');
    e.preventDefault();
    let formData = new FormData();
    formData.append('foto_produk', this.state.foto_produk);
    formData.append('foto_produk2', this.state.foto_produk2);
    formData.append('foto_produk3', this.state.foto_produk3);
    formData.append('id_username', id_username);
    formData.append('posting', this.state.posting);
    formData.append('alamat', this.state.alamat);
    formData.append('harga', this.state.harga);
    formData.append('status', this.state.status);
    formData.append('deskripsi', this.state.deskripsi);

    axios.post('http://localhost:8002/dataiklan/', formData)
      .then((hasil) => {
        console.log('hasil', hasil)
        var respon = hasil.statusText;
        if (respon === "OK") {
          < Modal />
          this.setState({ submit: true, status: true })
        } else {
          this.setState({ fail: true })
        }
      })
  }


  render() {
    const tampilstatus = this.state.tarikstatus.map((isi, index) => {
      var id = isi.id;
      var status = isi.status;
      return <option key={index} value={id}>{status}</option>
    })

    if (this.state.submit || this.state.fail || this.state.cancel) {
      return (
        <Redirect to="/Dashboard" />
      )
    } else {
      return (
        <div>
          {/* CONTENT */}
          <div className="container" style={{ marginTop: 80 }}>
            <div className="row">
              <div className="col-md-3" />
              <div className="col-md-6" style={{ backgroundColor: 'rgb(192, 188, 181)', padding: 30, borderRadius: '1%' }}>
                <div className="panel-heading">
                  <h3><b>Pasang Iklan</b></h3>
                </div>
                <div className="panel-body">
                  <form onSubmit={this.value} encType="multipart/form-data">
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="juduliklan">Judul Iklan</label>
                        <input ref="posting" type="text" className="form-control" placeholder="Judul Iklan" />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="alamat">Alamat</label>
                        <input ref="alamat" type="text" className="form-control" placeholder="Alamat" />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="harga">Harga</label>
                        <input ref="harga" type="text" className="form-control" placeholder="Harga" />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputState">Status</label>
                        <select ref="status" className="form-control">
                          <option defaultValue>Pilih</option>
                          {tampilstatus}
                        </select>
                      </div>
                      {/* <div className="form-group col-md-6">
                      <label htmlFor="inputState">Kategori</label>
                      <select ref="kategori" className="form-control">
                        <option selected>Pilih</option>
                        <option defaultValue={this.state.kategori} ref="apartment">Apartment</option>
                        <option ref="rumah">Apartment</option>
                      </select>
                    </div> */}
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label>Deskripsi</label>
                        <textarea ref="deskripsi" className="form-control" style={{ height: 150 }} placeholder="Deskripsi" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label>Foto 1</label>
                        <input name="foto_produk" onChange={this.onchange} type="file" className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label>Foto 2</label>
                        <input name="foto_produk2" onChange={this.onchange} type="file" className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label>Foto 3</label>
                        <input name="foto_produk3" onChange={this.onchange} type="file" className="form-control" />
                      </div>
                    </div>
                    <button
                      type="reset"
                      className="btn btn-warning"
                      style={{ marginRight: 10 }}
                      onClick={() => this.handleCancel()}>Cancel
                    </button>
                    <button type="submit" onClick={() => this.dataiklan(this.refs)} className="btn btn-primary">Simpan</button>

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
}

export default Pasang_iklan; 