import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobDetailsItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-details-item">
        <div className="job-details-logo-name-rating-container">
          <div className="job-details-logo-container">
            <img alt="company logo" src={companyLogoUrl} />
          </div>
          <div className="job-details-name-rating-container">
            <h1>{title}</h1>
            <p>
              <span className="rating-star">
                <AiFillStar className="star-tag" />
              </span>
              {rating}
            </p>
          </div>
        </div>
        <div className="job-details-location-type-package-container">
          <div className="job-details-location-type-container">
            <div className="job-details-location-container">
              <p>
                <span>
                  <MdLocationOn className="react-icon-location" />
                </span>
                {location}
              </p>
            </div>
            <div className="job-details-type-container">
              <p>
                <span>
                  <BsFillBriefcaseFill className="react-icon-type" />
                </span>
                {employmentType}
              </p>
            </div>
          </div>
          <div className="job-package-container">
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="horizontal-line" />
        <div className="job-description-container">
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobDetailsItem
