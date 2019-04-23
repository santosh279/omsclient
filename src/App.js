import React, { Component } from 'react'
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import SignIn from './Components/signInForm'
import Register from './Components/registerForm'
import NavigationRoutesPage from './Routes'
import axios from 'axios'

class App extends Component {
  state = {
    serverDown: false
  }
  componentDidMount () {
    axios
      .get('http://localhost:3003/')
      .then(res => {
        console.log('response inside the start page', res)
      })
      .catch(error => {
        console.log(error.name === 'Error')
        if (error.name === 'Error') {
          // this.setState({
          //   serverDown: true
          // })
          localStorage.clear()
          // window.location.href = '/'
          // window.location.reload()
        }
        console.log(this.state.serverDown)
      })
  }
  render () {
    // validate authentication
    const isAuth = () => {
      let access_token = localStorage.getItem('access_token')
      let rememberMe = localStorage.getItem('rememberMe')
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
