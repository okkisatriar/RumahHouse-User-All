import axios from 'axios';
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';


const cookies = new Cookies();
class Edit_iklan extends Component {
  state = {
    tarikstatus_edit: [],
    cancel: false,
    submit: false,
    id: '',
    posting: '',
    alamat: '',
    harga: '',
    status: '',
    luasBangunan: '',
    luasTanah: '',
    kamarTidur: '',
    kamarMandi: '',
    lantai: '',
    deskripsi: '',
    getFoto_produk: '',
    getFoto_produk2: '',
    getFoto_produk3: ''
  }

  componentDidMount() {
    var id_produk = this.props.location.state.id;
    this.getDetailIklan(id_produk);
  }

  getDetailIklan = (id_produk) => {
    axios.post('http://localhost:8002/Edit_iklan', { id_produk: id_produk }).then((hasilambil) => {
      this.setState({
        id: hasilambil.data[0].id,
        posting: hasilambil.data[0].posting,
        alamat: hasilambil.data[0].alamat,
        harga: hasilambil.data[0].harga,
        status: hasilambil.data[0].status,
        kamarMandi: hasilambil.data[0].kamar_mandi,
        kamarTidur: hasilambil.data[0].kamar_tidur,
        luasBangunan: hasilambil.data[0].luas_bangunan,
        luasTanah: hasilambil.data[0].luas_tanah,
        lantai: hasilambil.data[0].lantai,
        deskripsi: hasilambil.data[0].deskripsi,
        getFoto_produk: hasilambil.data[0].foto_produk,
        getFoto_produk2: hasilambil.data[0].foto_produk2,
        getFoto_produk3: hasilambil.data[0].foto_produk3,
      })
    })

    axios.post('http://localhost:8002/tarikstatus_edit').then((getData) => {
      this.setState({ tarikstatus_edit: getData.data })
    })
  }

  handleCancel = () => {
    this.setState({ cancel: true })
  }
  change = (e) => {
    this.setState({
      status: e.target.value
    })
  }

  onchange = (e) => {
    console.log(e.target.files, 'onchange')
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

  value = (e) => {
    console.log(e, 'e')
    var id = e.id.value;
    var posting = e.posting.value;
    var alamat = e.alamat.value;
    var harga = e.harga.value;
    var status = e.status.value;
    var kamarMandi = e.kamarMandi.value;
    var kamarTidur = e.kamarTidur.value;
    var luasBangunan = e.luasBangunan.value;
    var luasTanah = e.luasTanah.value;
    var lantai = e.lantai.value;
    var deskripsi = e.deskripsi.value;
    this.setState({
      id: id,
      posting: posting,
      alamat: alamat,
      status: status,
      harga: harga,
      kamarMandi: kamarMandi,
      kamarTidur: kamarTidur,
      luasBangunan: luasBangunan,
      luasTanah: luasTanah,
      lantai: lantai,
      deskripsi: deskripsi,
    })
  }

  updateData = (e) => {
    var id_username = cookies.get('login');
    e.preventDefault();
    let formData = new FormData();
    formData.append('id', this.state.id);
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
    axios.post('http://localhost:8002/updateiklan/', formData).then((response) => {
      if (response.statusText === 'OK') {
        this.setState({ submit: true })
      } else {
        this.setState({ cancel: true })
      }
    })
  }

  render() {
    const tampilstatus_edit = this.state.tarikstatus_edit.map((isi, index) => {
      var id = isi.id;
      var status = isi.status;
      return <option key={index} value={id}>{status}</option>
    })

    if (this.state.cancel || this.state.submit) {
      return (
        <Redirect to="/Dashboard" />
      )
    } else {
      return (
        <div>
          <div className="container" style={{ marginTop: 80 }}>
            <div className="row">
              <div className="col-md-12" style={{ backgroundColor: 'rgb(192, 188, 181)', padding: 30, borderRadius: '1%' }}>
                <div className="panel-heading">
                  <h3><b>Edit Iklan</b></h3>
                </div>
                <div className="panel-body">
                  <form onSubmit={this.updateData} encType="multipart/form-data">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-row">
                          <input type="hidden" className="form-control" ref="id" defaultValue={this.state.id} />
                          <div className="form-group col-md-12">
                            <label htmlFor="posting">Judul Iklan</label>
                            <input ref="posting" type="text" className="form-control" defaultValue={this.state.posting} placeholder="Judul Iklan" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="alamat">Alamat</label>
                            <input ref="alamat" type="text" className="form-control" defaultValue={this.state.alamat} placeholder="Alamat" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="harga">Harga</label>
                            <input ref="harga" type="text" className="form-control" defaultValue={this.state.harga} placeholder="Harga" />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputState">Status</label>
                            <select ref="status" value={this.state.status} onChange={this.onchange} className="form-control">
                              {tampilstatus_edit}
                            </select>
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputState">Kategori</label>
                            <select ref="kategori" className="form-control">
                              <option selected>Pilih</option>
                              <option defaultValue={this.state.kategori}>Apartment</option>
                              <option ref="rumah">Rumah</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="deskripsi">Deskripsi</label>
                            <input
                              ref="deskripsi"
                              className="form-control"
                              defaultValue={this.state.deskripsi}
                              placeholder="Deskripsi"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="foto1">Foto 1</label>
                            <img style={{ maxHeight: 200 }} src={'http://localhost:8002/tampungfile/' + this.state.getFoto_produk} className="rounded mx-auto d-block" alt={this.state.getFoto_produk}></img>
                          </div>
                          <div className="input-group mb-3">
                            <div className="custom-file">
                              <input name="foto_produk" onChange={this.onchange} type="file" className="custom-file-input" id="inputGroupFile01"></input>
                              <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.getFoto_produk ? this.state.getFoto_produk : 'Choose file'}</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="foto1">Foto 2</label>
                            <img style={{ maxHeight: 200 }} src={'http://localhost:8002/tampungfile/' + this.state.getFoto_produk2} className="rounded mx-auto d-block" alt={this.state.getFoto_produk2}></img>
                          </div>
                          <div className="input-group mb-3">
                            <div className="custom-file">
                              <input name="foto_produk2" onChange={this.onchange} type="file" className="custom-file-input" id="inputGroupFile02"></input>
                              <label className="custom-file-label" htmlFor="inputGroupFile02">{this.state.getFoto_produk2 ? this.state.getFoto_produk2 : 'Choose file'}</label>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="foto1">Foto 3</label>
                            <img style={{ maxHeight: 200 }} src={'http://localhost:8002/tampungfile/' + this.state.getFoto_produk3} className="rounded mx-auto d-block" alt={this.state.getFoto_produk3}></img>
                          </div>
                          <div className="input-group mb-3">
                            <div className="custom-file">
                              <input name="foto_produk3" onChange={this.onchange} type="file" className="custom-file-input" id="inputGroupFile03"></input>
                              <label className="custom-file-label" htmlFor="inputGroupFile03">{this.state.getFoto_produk3 ? this.state.getFoto_produk3 : 'Choose file'}</label>
                            </div>
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
                        onClick={() => this.value(this.refs)}
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

export default Edit_iklan;