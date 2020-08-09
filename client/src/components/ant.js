import React from 'react';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
function Ant() {


  return (
    <div
    >
          <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
        <Button color="primary">Hello World</Button>

      </Container>
    </React.Fragment>
    </div>
  );
}

export default Ant