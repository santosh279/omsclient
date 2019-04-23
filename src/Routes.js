import React from 'react'
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'
import SideBar from './Components/Sidebar/sidebar'
import Orders from './Components/orders'

class NavigationRoutesPage extends React.Component {
  render () {
    return (
      <Router>
        <div className='app'>
          <SideBar {...this.props} />
          <div
            class='row'
            style={{
              marginTop: '10%',
              maxWidth: '55%',
              marginLeft: '20%',
              position: 'relative'
            }}
          >
            <Switch>
              <Route exact path='/orders' component={Orders} />
              <Redirect from='/' to='/orders' />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default NavigationRoutesPage
