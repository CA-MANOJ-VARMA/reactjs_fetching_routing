import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class CourseDetails extends Component {
  state = {apiStatus: apiStatusConstants.progress, courseDetails: ''}

  componentDidMount = () => {
    this.cardDetails()
  }

  cardDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    console.log(apiUrl)
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const jsonData = await response.json()
      console.log(jsonData.course_details)
      this.setState({
        apiStatus: apiStatusConstants.success,
        courseDetails: jsonData.course_details,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
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
        onClick={this.cardDetails}
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

  successCardDetails = () => {
    const {courseDetails} = this.state
    return (
      <div className="css-courseDetails-container">
        <img
          src={courseDetails.image_url}
          alt={courseDetails.name}
          className="css-course-image-itself"
        />
        <div>
          <h1>{courseDetails.name}</h1>
          <p>{courseDetails.description}</p>
        </div>
      </div>
    )
  }

  displayFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.progress:
        return this.loaderFunction()
      case apiStatusConstants.success:
        return this.successCardDetails()
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
        <div className="css-courseDetails-bg-container">
          {this.displayFunction()}
        </div>
      </>
    )
  }
}

export default CourseDetails
