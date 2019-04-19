import React, { Component } from 'react'
import { history } from './helpers'
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import SignIn from './Components/signInForm'
import Register from './Components/registerForm'
import NavigationRoutesPage from './Routes'

class App extends Component {
  render () {
    // validate authentication
    const isAuth = () => {
      let access_token = localStorage.getItem('user')
      if (access_token) {
        return true
      }
      return false
    }
    return (
      <Router>
        <div className='app'>
          <Switch>
            <Route path='/login' component={SignIn} />
            <Route exact path='/register' component={Register} />
            {isAuth() ? (
              <Route path='/' name='orders' component={NavigationRoutesPage} />
            ) : (
              <Route exact path='/' render={() => <Redirect to='/login' />} />
            )}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
