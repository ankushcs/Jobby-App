import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import AllJobsSection from './components/AllJobsSection'
import JobItemFullDetails from './components/JobItemFullDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={AllJobsSection} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemFullDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
