import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, coursesArray: []}

  componentDidMount = () => {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const jsonData = await response.json()
      this.setState({
        coursesArray: jsonData.courses,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  successView = () => {
    const {coursesArray} = this.state
    return (
      <>
        <h1>Courses</h1>
        <ul className="css-ul-successview-container">
          {coursesArray.map(eachCourse => (
            <li key={eachCourse.id}>
              <Link
                to={`/courses/${eachCourse.id}`}
                className="css-link-container"
              >
                <div className="css-list-container">
                  <img src={eachCourse.logo_url} alt={eachCourse.name} />
                  <p>{eachCourse.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  failureView = () => (
    <div className="css-failureview-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="css-retry-button"
        onClick={this.fetchDetails}
      >
        Retry
      </button>
    </div>
  )

  loaderFunction = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  displayFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.loaderFunction()
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="css-displayContainer">{this.displayFunction()}</div>
      </>
    )
  }
}

export default Home
