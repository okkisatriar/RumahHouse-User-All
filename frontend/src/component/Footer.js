import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer style={{ marginTop: 300 }}>
                <div className="container-fluid; section footer-classic context-dark bg-image" style={{ marginTop: 50, background: '#E95420' }}>
                    <div className="row no-gutters social-container" style={{ marginTop: 30 }}>
                        <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-facebook" /><span>Facebook</span></a></div>
                        <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-instagram" /><span>instagram</span></a></div>
                        <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-twitter" /><span>twitter</span></a></div>
                        <div className="col"><a className="social-inner" href="#"><span className="icon mdi mdi-youtube-play" /><span>google</span></a></div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;