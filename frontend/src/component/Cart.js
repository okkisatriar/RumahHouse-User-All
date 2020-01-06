import React, { Component } from 'react'
import {Link, Route, Redirect} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class Cart extends Component {
  state = {
    datacart: []
  }
  componentWillMount = () => {
    axios.get('http://localhost:8002/datacart').then((getData) => {
      console.log(getData.data)
      this.setState({
        datacart: getData.data
      });
    });
    console.log(this.state.datacart)
  }


  hapuscart = (event) =>
  {
      axios.post(`http://localhost:8002/hapuscart`,
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

    const listcart = this.state.datacart.map((isi, index) => {
      var urutan = index + 1;
      var id = isi.id;
      var posting = isi.posting;
      var id_produk = isi.id_produk;
      var alamat = isi.alamat;
      var harga = isi.harga;
      var fotocart = isi.foto_produk;
      console.log(id_produk)
      return <div className="tab-content" id="nav-tabContent" style={{marginTop: 40}}>
        <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
              <img className="card-img-top" src={'http://localhost:8002/tampungfile/'+fotocart} alt="Card image cap" />
              </div>
            </div>
            <div className="col-md-6">
              <h3><b>{posting}</b></h3>
              <p>{alamat}</p>
              <h2><b>IDR {harga}</b></h2>
              <button onClick={() => this.hapuscart(id_produk)} className="btn btn-primary" style={{marginTop: 10}}>REMOVE</button>
            </div>
          </div>
        </div>
      </div>
         })  

 
    return (
      <div>
        <Header/>
         {/* TITLE */}
         <div style={{textAlign: 'center', marginTop: 75}}>
         <h3 style={{fontWeight: 'bold'}}>YOUR CART</h3>
       </div>
       {/* LIST */}
        <div className="container" style={{marginTop: 60}}>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-8">
                  
                  {/* Produck Cart List*/}
                  {listcart}
                  
                </div>

                  {/* Payment */}
               <div className="col-md-4" style={{marginTop: 10}}>
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
               </div>   
             </div>
           </div>
         </div>
       </div>
        <Footer/>
      </div>
    )
  }
}

export default Cart;