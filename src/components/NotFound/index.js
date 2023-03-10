import {Component} from 'react'
import Navbar from '../Navbar'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="css-notfound-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
            alt="not found"
            className="css-website-logo-itself"
          />
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found</p>
        </div>
      </>
    )
  }
}

export default NotFound
