import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Return On Investment</Title>
      <Typography component="p" variant="h4">
        2.5%
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        since 15 March, 2019
      </Typography>
    </React.Fragment>
  );
}