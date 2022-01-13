import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-main-container">
        <div className="home-main-page-text-container">
          <div className="home-main-heading-container">
            <h1>Find The Job That Fits Your Life</h1>
          </div>
          <div className="home-main-para-container">
            <p>
              Millions of people are searching for jobs, salary information,
              company review. Find the job that fits your abilities and
              potential
            </p>
          </div>
          <div className="home-main-button-container">
            <Link to="/jobs">
              <button type="button">Find Jobs</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
