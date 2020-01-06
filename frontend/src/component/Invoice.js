import React, { Component } from 'react'
import {Link, Route, Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Invoice extends Component {
  render() {

    if (cookies.get('login') === undefined)
    {
      return <Redirect to='/'/>
    }

    return (
      <div>
        {/* INVOICE */}
        <div className="container" style={{border: '2px solid black', marginTop: 80}}>
          <div className="row">
            <div className="col-md-6" style={{padding: 20}}>
              <p>Invoice Number : INV89760001</p>
              <p>Date of Issue : 10/07/18</p>
              <p>Payment Method : Mandiri Transfer</p>
            </div>
            <div className="col-md-6" style={{textAlign: 'right', padding: 20}}>
              <p>BILLED TO:</p>
              <p>Okki Satria</p>
              <p>Setiabudi, Kuningan, Jakarta Selatan</p>
              <p>45123</p>
            </div>
          </div>
          <div>
            <table className="col-md-12">
              <thead>
                <tr className="table-active">
                  <th>Description</th>
                  <th>Unit Cost</th>
                  <th>Quantity</th>
                  <th>Ammount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>Apartemen Rasuna Said, Unit 17-B</p>
                  </td>
                  <td>IDR 400.000.000</td>
                  <td>1</td>
                  <td>400.000.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row" style={{marginTop: 100}}>
            <div className="col-md-6" />
            <div className="col-md-6" style={{textAlign: 'right'}}>
              <p>Sub Total: IDR 400.000.000</p>
              <p style={{borderBottom: '1px solid  black'}}>Tax: IDR 4.000.000</p>
              <p>Total: IDR 404.000.000</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8" />
            <div className="col-md-4" style={{marginTop: 30, textAlign: 'right'}}>
              <button type="button" className="btn btn-success">Konfirmasi</button>
              <button type="button" className="btn btn-info">Print</button>
            </div>
          </div>    
        </div>
      </div>
    )
  }
}
export default Invoice;