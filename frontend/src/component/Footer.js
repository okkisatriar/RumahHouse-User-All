import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <div>
                <footer>
                    <div className="container-fluid; section footer-classic context-dark bg-image" style={{marginTop: 50, background: '#E95420'}}>
                        <div className="row" style={{marginLeft: 200}}>
                            <div className="col-md-4" style={{marginTop: 50}}>
                                <p>We are an award-winning creative agency, dedicated to the best result in web design, promotion, business consulting, and marketing.</p>
                                Rights
                                <p className="rights"><span>©&nbsp; </span><span className="copyright-year">2018</span><span>&nbsp;</span><span>Waves</span><span>.&nbsp;</span><span>All Rights Reserved.</span></p>
                            </div>
                            <div className="col-md-4" style={{marginTop: 30}}>
                                <h5>Contacts</h5>
                                <dl className="contact-list">
                                    <dt>Address:</dt>
                                    <dd>798 South Park Avenue, Jaipur, Raj</dd>
                                </dl>
                                <dl className="contact-list">
                                    <dt>email:</dt>
                                    <dd><a href="mailto:#">dkstudioin@gmail.com</a></dd>
                                </dl>
                                <dl className="contact-list">
                                    <dt>phones:</dt>
                                    <dd><a href="tel:#">+91 7568543012</a> <span>or</span> <a href="tel:#">+91 9571195353</a>
                                    </dd>
                                </dl>
                            </div>
                            <div className="col-md-4" style={{marginTop: 30}}>
                                <h5>Links</h5>
                                <ul className="nav-list">
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Projects</a></li>
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">Contacts</a></li>
                                    <li><a href="#">Pricing</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row no-gutters social-container" style={{marginTop: 30}}>
                            <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-facebook" /><span>Facebook</span></a></div>
                            <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-instagram" /><span>instagram</span></a></div>
                            <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-twitter" /><span>twitter</span></a></div>
                            <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-youtube-play" /><span>google</span></a></div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}
export default Footer;