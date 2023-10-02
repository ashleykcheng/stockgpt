import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { getOrders } from './Firebase';
import { useContext } from "react";
import { Context } from "../context/AuthContext";
import { useState, useEffect } from 'react';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}



function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  
  const {user} = useContext(Context);
  console.log(user);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getOrders(user);
        setRows(orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchData();
  }, [user]);

  console.log("rows", rows);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate(); 
    return date.toLocaleDateString() + " " + date.toLocaleTimeString(); 
  };

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Price</TableCell>
            <TableCell align="right">Action</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
        
        {rows.map((row) => (
          
            <TableRow key={row.id}>
              <TableCell>{formatDate(row.data.time)}</TableCell>
              <TableCell>{row.data.stock}</TableCell>
              <TableCell>{row.data.amount}</TableCell>
              <TableCell>{row.data.price}</TableCell>
              <TableCell  align="right">{row.data.action}</TableCell>
   
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </React.Fragment>
  );
}