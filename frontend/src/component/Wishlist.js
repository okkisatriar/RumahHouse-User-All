import React, { Component } from 'react'
import {Link, Route, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';


const cookies = new Cookies();
class Wishlist extends Component {
  state = {
    datawishlist: []
  }
  componentWillMount = () => {
    axios.get('http://localhost:8002/datawishlist').then((getData) => {
      console.log(getData.data)
      this.setState({
        datawishlist: getData.data
      });
    });
    console.log(this.state.datawishlist)
  }


  hapuswishlist = (event) =>
  {
      axios.post(`http://localhost:8002/hapuswishlist`,
          {
              id_produk : event
          }
      )
      .then((response) =>
          {
              console.log(response)
          }
      );
      window.location.reload();
  }

  render() {
    
    if (cookies.get('login') === undefined)
    {
      return <Redirect to='/'/>
    }

    const listwishlist = this.state.datawishlist.map((isi, index) => {
      var urutan = index + 1;
      var id = isi.id;
      var posting = isi.posting;
      var id_produk = isi.id_produk;
      var alamat = isi.alamat;
      var harga = isi.harga;
      var fotowishlist = isi.foto_produk;
      console.log(id_produk)
      return <div className="tab-content" id="nav-tabContent" style={{marginTop: 40}}>
        <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
              <img className="card-img-top" src={'http://localhost:8002/tampungfile/'+fotowishlist} height={280} alt="Card image cap" />
              </div>
            </div>
            <div className="col-md-6">
              <h3><b>{posting}</b></h3>
              <p>{alamat}</p>
              <h2><b>IDR {harga}</b></h2>
              <button onClick={() => this.hapuswishlist(id_produk)} className="btn btn-primary" style={{marginTop: 10}}>REMOVE</button>
            </div>
          </div>
        </div>
      </div>
         })  

 
    return (
      <div>
         {/* TITLE */}
         <div style={{textAlign: 'center', marginTop: 75}}>
         <h3 style={{fontWeight: 'bold'}}>YOUR WISHLIST</h3>
       </div>
       {/* LIST */}
        <div className="container" style={{marginTop: 60}}>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-10">
                  
                  {/* Produck wishlist List*/}
                  {listwishlist}
                  
                </div>

                  {/* Payment */}
               {/* <div className="col-md-4" style={{marginTop: 10}}>
                 <fieldset className="form-group">
                   <legend>Payment Method</legend>
                   <div className="form-check">
                     <label className="form-check-label">
                       <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" defaultValue="option1" defaultChecked />
                       Mandiri - 13100007898283
                     </label>
                   </div>
                   <div className="form-check">
                     <label className="form-check-label">
                       <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                       BCA - 653892920987
                     </label>
                   </div>
                   <div className="form-check">
                     <label className="form-check-label">
                       <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" defaultValue="option2" />
                       BRI - 8773084087208
                     </label>
                   </div>
                 </fieldset>
                 <Link to="/Checkout"><button className="btn btn-success">CHECKOUT</button></Link>
               </div>    */}
             </div>
           </div>
         </div>
       </div>
      </div>
    )
  }
}

export default Wishlist;