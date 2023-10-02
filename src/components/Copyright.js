import * as React from 'react';
import {Link, Typography} from  "@mui/material";

export default function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          StockGPT
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }