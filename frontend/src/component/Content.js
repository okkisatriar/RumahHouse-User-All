import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Content extends Component {
  state = {
    propertibaru: [],
    propertipopuler: []
  }
  componentDidMount = () => {
    axios.post('http://localhost:8002/getNewProperty').then((getData) => {
      // console.log(getData.data)
      this.setState({
        propertibaru: getData.data
      });
    });
    axios.get('http://localhost:8002/getPopularProperty').then((dapatData) => {
      // console.log(dapatData.data)
      this.setState({
        propertipopuler: dapatData.data
      });
    });
  }

  render() {
    const propertyBaru = this.state.propertibaru.map((isi, index) => {
      var urutan = index + 1;
      var id = isi.id;
      var posting = isi.posting;
      var deskripsi = isi.deskripsi;
      var fotoProperti = isi.foto_produk;
      // console.log(id)
      return <div key={id} className="col-md-4" style={{ marginTop: 50 }}>
        <div className="card">
          <img className="card-img-top" src={'http://localhost:8002/tampungfile/' + fotoProperti} height={280} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{posting}</h5>
            <p className="card-text">{deskripsi}</p>
            <Link to={{ pathname: '/Product_detail/' + id, state: { id: id } }} className="btn btn-primary">View Detail</Link>
          </div>
        </div>
      </div>
    })

    var propertiPopuler = this.state.propertipopuler;
    var datasatu = [];
    var datadua = [];
    for (var i = 0; i < propertiPopuler.length; i++) {
      if (i < 3) {
        datadua.push(propertiPopuler[i]);
      }
      else {
        datasatu.push(propertiPopuler[i]);
      }
    }
    const propertipop = datasatu.map((isi, index) => {
      var urutanpop = index + 1;
      var id = isi.id;
      var postingpop = isi.posting;
      var deskripsipop = isi.deskripsi;
      var fotoPropertipop = isi.foto_produk;
      // console.log(id)
      return <div key={id} className="col-md-4" style={{ marginTop: 50 }}>
        <div className="card">
          <img className="card-img-top" src={'http://localhost:8002/tampungfile/' + fotoPropertipop} height={280} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{postingpop}</h5>
            <p className="card-text">{deskripsipop}.</p>
            <Link to={{ pathname: '/Product_detail/' + id, state: { id: id } }} className="btn btn-primary">View Detail</Link>
          </div>
        </div>
      </div>
    })


    return (
      <div>
        {/* CAROUSEL */}
        <div className="container-fluid" style={{ marginTop: 75 }}>
          <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                <li data-target="#carouselExampleIndicators" data-slide-to={2} />
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100" src="img/Main Caro.jpg" alt="First slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src="img/Main Caro.jpg" alt="Second slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src="img/Main Caro.jpg" alt="Third slide" />
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>

        {/* PROPERTI BARU */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12" style={{ textAlign: 'center', marginTop: 50 }}>
              <h1><b>PROPERTI BARU</b></h1>
            </div>
            {propertyBaru}
          </div>
        </div>

        {/* PROPERTI POPULER */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12" style={{ textAlign: 'center', marginTop: 50 }}>
              <h1><b>PROPERTI POPULER</b></h1>
            </div>
            {propertipop}
          </div>
        </div>
      </div>
    )
  }
}
export default Content;