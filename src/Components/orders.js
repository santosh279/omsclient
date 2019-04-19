import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Table from './table'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
})

function Orders (props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ color: 'black', textAlign: 'left', padding: '15px' }}>
              {"Order's list"}
            </div>
            <a
              href='javascript:void(0)'
              //   onClick={() => this.opnAddNewUserModal()}
            //   color='primary'
              style={{ textDecoration: 'none', textAlign: 'right' }}
              //   className='caret btn-sm mr-10 d-flex'
            >
              <i
                style={{ fontSize: '1.3rem' }}
                className='zmdi zmdi-account-add ml-10'
              />
              <span style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>
                {' '}
                Add Order
              </span>
            </a>
            <Table />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Orders)
