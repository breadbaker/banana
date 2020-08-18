import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Loader from 'components/loader'
import { css } from 'emotion'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'

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

function App({ children, actions, state }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url) => {
    return () => {
      actions.nav(url)
      setAnchorEl(null)
    }
  };

  const getLabel = () => {
    const path = state.routing.locationBeforeTransitions.pathname

    return {
      '/': 'New Flight',
      'newFlight': 'New Flight',
      'export': 'Log Export',
      'flights': 'Past Flights'
    }[path]
  }

  return (
    <div className={classes.root}>
      <Loader />
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
              <MenuItem onClick={handleClose('newFlight')}>New Flight</MenuItem>
              <MenuItem id="past-flights" onClick={() => {
                handleClose('flights')()
                actions.loadFlights()
              }}>Past Flights</MenuItem>
              <MenuItem onClick={actions.logout}>Logout</MenuItem>
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

{/* <MenuItem onClick={handleClose('export')}>Log Export</MenuItem> */}


function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
