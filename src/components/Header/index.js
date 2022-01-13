import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="header-logo-container">
        <Link to="/">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
      </div>
      <div className="header-list-items">
        <ul className="header-unordered-list">
          <Link to="/" className="link">
            <li className="header-unordered-list-item">Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li className="header-unordered-list-item">Jobs</li>
          </Link>
          <li className="header-logout-button-container">
            <button type="button" onClick={onClickLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withRouter(Header)
