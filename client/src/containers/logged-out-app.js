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

import { browserHistory } from 'react-router'

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

function LoggedOutApp({ children }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (url) => {
    return () => {
      browserHistory.push(`/${url}`)
      setAnchorEl(null)
    }
  };

  const getLabel = () => {
    const path = window.location.pathname
    
    const foundPath =  {
      'welcome/login': 'Login',
      'welcome/signup': 'Signup',
      'welcome/forgot': 'Forgot Password'
    }[path]

    return foundPath || 'User Records'
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

export default LoggedOutApp