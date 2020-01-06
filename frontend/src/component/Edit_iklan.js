import React, { Component } from 'react'
import {Link, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';


const cookies = new Cookies();
class Edit_iklan extends Component {
state=
{
  tarikstatus_edit:[],
  id:'',
  posting:'',
  alamat:'',
  harga:'',
  status:'',
  // kategori:'',
  deskripsi:'',
  // foto_produk:'',
  // foto_produk2:'',
  // foto_produk3:'',
}

componentDidMount(){
  var id_produk= this.props.location.state.id;
  axios.post('http://localhost:8002/Edit_iklan',{
    id_produk:id_produk
  })
  .then(
      (hasilambil) => {
          console.log(hasilambil);
          this.setState({
            id:hasilambil.data[0].id,
            posting:hasilambil.data[0].posting,
            alamat:hasilambil.data[0].alamat,
            harga:hasilambil.data[0].harga,
            status:hasilambil.data[0].status,
            // kategori:hasilambil.data[0].kategori,
            deskripsi:hasilambil.data[0].deskripsi,
            // foto_produk:hasilambil.data[0].foto_produk
          });
      }
      
  );

  axios.post('http://localhost:8002/tarikstatus_edit').then((getData) =>{
    console.log(getData.data)
    this.setState(
      {
        tarikstatus_edit: getData.data
      });
  });
}
    
change = (e) =>
{
    this.setState({
        status: e.target.value
    })
}
onchange = (e) => 
    {
        switch(e.target.name){
            case 'foto_produk': 
            this.setState({
              foto_produk:e.target.files[0]
            });
            case 'foto_produk2': 
            this.setState({
              foto_produk2:e.target.files[0]
            });
            case 'foto_produk3': 
            this.setState({
              foto_produk3:e.target.files[0]
            });
            break;
        }
    }

value = (e) => {
  var id = e.id.value;
  var posting = e.posting.value;
  var alamat = e.alamat.value;
  var harga = e.harga.value;
  var status = e.status.value;
  // var kategori = e.kategori.value;
  var deskripsi = e.deskripsi.value;
  // var foto_produk =e.foto_produk.value;
  // var foto_produk2 =e.foto_produk2.value;
  // var foto_produk3 =e.foto_produk3.value;
  this.setState({
    id:id,
    posting:posting,
    alamat:alamat,
    status:status,
    // kategori:kategori,
    harga:harga,
    deskripsi:deskripsi,
    // foto_produk:foto_produk
  })
}

updateData = (e) => {
  var id_username = cookies.get('login');
  e.preventDefault();
  let formData = new FormData();
  formData.append('id', this.state.id);
  formData.append('foto_produk',this.state.foto_produk);
  formData.append('foto_produk2',this.state.foto_produk2);
  formData.append('foto_produk3',this.state.foto_produk3);
  formData.append('id_username', id_username);
  formData.append('posting', this.state.posting);
  formData.append('alamat', this.state.alamat);
  // formData.append('kategori', this.state.kategori);
  formData.append('harga', this.state.harga);
  formData.append('status', this.state.status);
  formData.append('deskripsi', this.state.deskripsi);
  axios.post('http://localhost:8002/updateiklan/', formData);
}



    render() {
    const tampilstatus_edit = this.state.tarikstatus_edit.map((isi, index) => {
      // var urutan = index + 1;
      var id = isi.id;
      var status= isi.status;
      return <option value ={id}>{status}</option>
    })

    return (
      <div>
        <div className="container" style={{marginTop: 80}}>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6" style={{backgroundColor: 'rgb(192, 188, 181)', padding: 30, borderRadius: '1%'}}>
            <div className="panel-heading">
              <h3><b>Edit Iklan</b></h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.updateData} encType="multipart/form-data">
                <div className="form-row">
                <input type="hidden" className="form-control" ref="id" defaultValue={this.state.id}/>
                  <div className="form-group col-md-12">
                    <label htmlFor="namadepan">Judul Iklan</label>
                    <input ref="posting"type="text" className="form-control" defaultValue={this.state.posting} placeholder="Judul Iklan" />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="namadepan">Alamat</label>
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
                  {/* <div className="form-group col-md-6">
                    <label htmlFor="inputState">Kategori</label>
                    <select ref="kategori" className="form-control">
                      <option selected>Pilih</option>
                      <option defaultValue={this.state.kategori}>Apartment</option>
                      <option ref="rumah">Rumah</option>
                    </select>
                  </div> */}
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="deskripsi">Deskripsi</label>
                    <textarea ref="deskripsi" className="form-control" defaultValue={this.state.deskripsi} style={{height: 150}} placeholder="Deskripsi" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="foto1">Foto 1</label>
                    <input name="foto_produk" onChange={this.change} type="file" className="form-control" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="foto1">Foto 2</label>
                    <input name="foto_produk2" onChange={this.onchange} type="file" className="form-control" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="foto1">Foto 3</label>
                    <input name="foto_produk3" onChange={this.onchange} type="file" className="form-control" />
                  </div>
                </div>
                <button type="reset" className="btn btn-warning">Cancel</button>&nbsp;
                <button type="submit" onClick={() => this.value(this.refs)} className="btn btn-primary">Simpan</button>
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
export default Edit_iklan;