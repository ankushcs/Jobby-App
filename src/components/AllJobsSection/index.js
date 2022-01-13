import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobDetailsItem from '../JobDetailsItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    profileDetails: {},
    isLoading: true,
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    activeEmploymentId: [],
    activeSalaryRangeId: '',
    searchValue: '',
    searchTempValue: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsDetailsList()
  }

  getUpdatedData = eachItem => ({
    name: eachItem.name,
    profileImageUrl: eachItem.profile_image_url,
    shortBio: eachItem.short_bio,
  })

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = this.getUpdatedData(data.profile_details)
    this.setState({profileDetails: updatedData, isLoading: false})
  }

  getJobsDetailsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmploymentId, activeSalaryRangeId, searchValue} = this.state

    const activeEmploymentIdStr = activeEmploymentId.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentIdStr}&minimum_package=${activeSalaryRangeId}&search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedDate = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: updatedDate,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  isLoadingRender = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeEmployeeType = event => {
    const {activeEmploymentId} = this.state
    console.log('extracting of data is happening every time i click to change')
    const findElement = activeEmploymentId.find(
      eachItem => eachItem === event.target.value,
    )
    if (findElement === undefined) {
      this.setState(
        prevState => ({
          activeEmploymentId: [
            ...prevState.activeEmploymentId,
            event.target.value,
          ],
        }),
        this.getJobsDetailsList,
      )
    } else {
      const index = activeEmploymentId.findIndex(
        eachItem => eachItem === event.target.value,
      )
      activeEmploymentId.splice(index, 1)
      this.setState(
        {activeEmploymentId: [...activeEmploymentId]},
        this.getJobsDetailsList,
      )
    }
  }

  getTypeOfEmployee = (label, employmentIdType) => (
    <li className="employment-type-list-item">
      <input
        type="checkbox"
        id={employmentIdType}
        value={employmentIdType}
        onChange={this.onChangeEmployeeType}
      />
      <label htmlFor={employmentIdType}>{label}</label>
      <br />
    </li>
  )

  onChangeSalaryDemand = event => {
    this.setState(
      {activeSalaryRangeId: event.target.value},
      this.getJobsDetailsList,
    )
  }

  showSalaryRangeItems = (salaryId, label) => (
    <li className="salary-range-item">
      <input
        type="radio"
        id="salary"
        name="salary"
        value={salaryId}
        onChange={this.onChangeSalaryDemand}
      />
      <label htmlFor="salary">{label}</label>
      <br />
    </li>
  )

  renderNoObjectFound = () => (
    <div className="no-object-found-section">
      <img
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other Filters</p>
    </div>
  )

  renderAllJobsSection = () => {
    const {jobsList} = this.state
    if (jobsList.length > 0) {
      return (
        <ul>
          {jobsList.map(eachItem => (
            <JobDetailsItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      )
    }
    return this.renderNoObjectFound()
  }

  onChangeSearchValue = event => {
    this.setState({searchTempValue: event.target.value})
  }

  onClickSearchButton = event => {
    event.preventDefault()
    const {searchTempValue} = this.state
    this.setState({searchValue: searchTempValue}, this.getJobsDetailsList)
  }

  onClickRetryButton = () => {
    this.getJobsDetailsList()
  }

  renderFailureView = () => (
    <div className="failure-view-section">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickRetryButton}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllJobsSection()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {profileDetails, isLoading} = this.state
    return (
      <>
        <Header />
        <div className="all-jobs-section-main-container">
          <div className="name-and-filter-container">
            {isLoading ? (
              this.isLoadingRender()
            ) : (
              <div className="name-container">
                <img alt="profile" src={profileDetails.profileImageUrl} />
                <h1>{profileDetails.name}</h1>
                <p>{profileDetails.shortBio}</p>
              </div>
            )}
            <hr />
            <div className="type-of-employment-container">
              <h1>Type of Employment</h1>
              <ul className="type-of-employment-lists">
                {employmentTypesList.map(eachItem =>
                  this.getTypeOfEmployee(
                    eachItem.label,
                    eachItem.employmentTypeId,
                  ),
                )}
              </ul>
            </div>
            <hr />
            <div className="salary-range-container">
              <h1>Salary Range</h1>
              <ul>
                {salaryRangesList.map(eachItem =>
                  this.showSalaryRangeItems(
                    eachItem.salaryRangeId,
                    eachItem.label,
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="search-input-and-display-jobs-container">
            <form
              className="search-input-container"
              method="get"
              onSubmit={this.onClickSearchButton}
            >
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchValue}
              />
              <button
                type="submit"
                testid="searchButton"
                className="search-input-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </form>
            <div className="display-all-jobs-container">
              {this.renderJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AllJobsSection
