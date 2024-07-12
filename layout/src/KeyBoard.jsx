import React from 'react'
import {
  Grid,
  Table,
  TableContainer,
  Typography
} from '@mui/material';

export default function KeyBoard() {
  return (
   <>
    <Grid container>
      <Grid item xs={5}>
        <Typography>ĐỎ</Typography>
        <TableContainer>
          <Table>
            
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={5}>
        <Typography>XANH</Typography>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
   </> 
  )
}
