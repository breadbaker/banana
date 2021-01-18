import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { css } from 'emotion'
import { browserHistory } from 'react-router'

import Loader from 'components/loader'
import { getAuth, saveAuth } from 'util/auth'
import jwt from 'jsonwebtoken'


import fetcherize from 'util/fetcher'

import useSWR from 'swr'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App({ children }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const auth = getAuth()
  if (!auth || !auth.IdToken) {
    browserHistory.push('/welcome/login')
    return <p></p>
  }
  const {
    'custom:stripe_id': stripeId
  } = jwt.decode(auth.IdToken)
  const fetcher = fetcherize({
    data: {
      stripe_id: stripeId
    }
  })

  const { data: billingData, error } = useSWR(`/billing`, fetcher, {initialData: {action: 'loading'}})
  if (billingData.action === 'redirect') {
    var stripe = Stripe(billingData.stripe_pk);
    stripe.redirectToCheckout({
      sessionId: billingData.session_id
    })
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url) => {
    return () => {
      browserHistory.push(url)
      setAnchorEl(null)
    }
  };

  const getLabel = () => {
    const path = window.location.pathname

    return {
      '/': 'New Endorsement',
      'newFlight': 'New Flight',
      'export': 'Log Export',
      'flights': 'Past Flights',
      'newEndorsement': 'New Endorsement',
      'endorsements': 'Endorsements'
    }[path]
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose('newEndorsement')}>New Endorsement</MenuItem>
              <MenuItem onClick={handleClose('newFlight')}>New Flight</MenuItem>
              <MenuItem onClick={handleClose('endorsements')}>Endorsements</MenuItem>
              <MenuItem id="past-flights" onClick={() => {
                handleClose('flights')()
              }}>Past Flights</MenuItem>
              <MenuItem onClick={()=> {
                saveAuth(null)
                browserHistory.push('/welcome/login')
              }}>Logout</MenuItem>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              {getLabel()}
            </Typography>
        </Toolbar>
      </AppBar>
      <br />
      {children}
    </div>
  );
}

export default App
