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
    var kamarMandi = e.kamarMandi.value;
    var kamarTidur = e.kamarTidur.value;
    var luasBangunan = e.luasBangunan.value;
    var luasTanah = e.luasTanah.value;
    var lantai = e.lantai.value;
    var deskripsi = e.deskripsi.value;
    this.setState({
      posting: posting,
      alamat: alamat,
      harga: harga,
      status: status,
      kamarMandi: kamarMandi,
      kamarTidur: kamarTidur,
      luasBangunan: luasBangunan,
      luasTanah: luasTanah,
      lantai: lantai,
      deskripsi: deskripsi
    })
  }

  value = (e) => {
    console.log('e ssss', e)
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
    formData.append('kamarMandi', this.state.kamarMandi);
    formData.append('kamarTidur', this.state.kamarTidur);
    formData.append('luasBangunan', this.state.luasBangunan);
    formData.append('luasTanah', this.state.luasTanah);
    formData.append('lantai', this.state.lantai);
    formData.append('deskripsi', this.state.deskripsi);

    axios.post('http://localhost:8002/dataiklan/', formData).then((hasil) => {
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

              <div className="col-md-12" style={{ backgroundColor: 'rgb(192, 188, 181)', padding: 30, borderRadius: '1%' }}>
                <div className="panel-heading">
                  <h3><b>Pasang Iklan</b></h3>
                </div>
                <div className="panel-body">
                  <form onSubmit={this.value} encType="multipart/form-data">
                    <div className="row">
                      <div className="col-md-6">
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
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="luasBangunan">Luas bangunan</label>
                          <input ref="luasBangunan" type="text" className="form-control" defaultValue={this.state.luasBangunan} placeholder="Luas bangunan" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="luasTanah">Luas Tanah</label>
                          <input ref="luasTanah" type="text" className="form-control" defaultValue={this.state.luasTanah} placeholder="Luas tanah" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="kamarTidur">Kamar tidur</label>
                          <input ref="kamarTidur" type="text" className="form-control" defaultValue={this.state.kamarTidur} placeholder="Kamar tidur" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="kamarMandi">Kamar Mandi</label>
                          <input ref="kamarMandi" type="text" className="form-control" defaultValue={this.state.kamarMandi} placeholder="Kamar Mandi" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="lantai">Lantai</label>
                          <input ref="lantai" type="text" className="form-control" defaultValue={this.state.lantai} placeholder="Lantai" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="fasilitas">Fasilitas</label>
                          <div className="row">
                            <div className="col-6"><input type="checkbox" /> AC</div>
                            <div className="col-6"><input type="checkbox" /> Water heater</div>
                          </div>
                          <div className="row">
                            <div className="col-6"><input type="checkbox" /> Swimming Poop</div>
                            <div className="col-6"><input type="checkbox" /> Refrigerator</div>
                          </div>
                          <div className="row">
                            <div className="col-6"><input type="checkbox" /> Carport</div>
                            <div className="col-6"><input type="checkbox" /> Stove</div>
                          </div>
                          <div className="row">
                            <div className="col-6"><input type="checkbox" /> Garden</div>
                            <div className="col-6"><input type="checkbox" /> Microwave</div>
                          </div>
                          <div className="row">
                            <div className="col-6"><input type="checkbox" /> Garasi</div>
                            <div className="col-6"><input type="checkbox" /> Oven</div>
                          </div>
                          <div className="row">
                            <div className="col-6"><input type="checkbox" /> Telephone</div>
                            <div className="col-6"><input type="checkbox" /> Fire Extenguisher</div>
                          </div>
                          <div className="row">
                            <div className="col-6"><input type="checkbox" /> PAM</div>
                            <div className="col-6"><input type="checkbox" /> Gordyn</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ float: "right", marginTop: 10 }}>
                      <button
                        type="reset"
                        className="btn btn-warning"
                        style={{ marginRight: 10 }}
                        onClick={() => this.handleCancel()}>Cancel
                    </button>
                      <button
                        type="submit"
                        onClick={() => this.dataiklan(this.refs)}
                        className="btn btn-primary">Simpan
                    </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Pasang_iklan; 