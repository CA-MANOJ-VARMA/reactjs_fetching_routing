import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Navbar extends Component {
  render() {
    return (
      <div className="css-navbar-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
            className="css-website-logo-itself"
          />
        </Link>
      </div>
    )
  }
}

export default Navbar
