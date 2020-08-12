import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

function LoggedOutApp({ children, actions, state }) {
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
      'welcome/login': 'Login',
      'welcome/signup': 'Signup',
      'welcome/forgot': 'Forgot Password'
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
              <MenuItem onClick={handleClose('welcome/login')}>Login</MenuItem>
              <MenuItem onClick={handleClose('welcome/signup')}>Signup</MenuItem>
              <MenuItem onClick={handleClose('welcome/forgot')}>Forgot Password</MenuItem>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              {getLabel() || 'Login'}
            </Typography>
        </Toolbar>
      </AppBar>
      <br />
      {children}
    </div>
  );
}

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
)(LoggedOutApp)
