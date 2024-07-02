import React from 'react';
import PropTypes from 'prop-types';
import { 
  Grid,
  Typography
} from '@mui/material';

import "./assets/css/HienThi.css";

// Tỉ lệ giao diện
const propo = 1.25;
const subTitle = "h5";
const imContent = "h3";
const mainTitle = "h2";

function HienThi(props) {
  const { red_user, blue_user, match, round, time } = props;

  return (
    <>
      <Grid container>
        <Grid item xs={propo} className='do'>
          {/* Layout bên dọc trái */}
          <Typography variant={mainTitle} className='heading flag'>.</Typography>
          <Typography variant={imContent} className='center score'>CLB</Typography>
          <Typography variant={subTitle} className='footer'>
            <Typography variant={subTitle} className='center' >Gam-Jeom</Typography>
            <Typography variant={imContent} className='center'>{red_user.gam_jeom}</Typography>
          </Typography>
        </Grid>
        <Grid item xs={12 - 2 * propo}>
          {/* Layout chính giữa (hiển thị điểm) */}
          <Grid container>
            <Grid item xs={6}>
              <Typography variant={mainTitle} className='center heading do'>{red_user.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant={mainTitle} className='center heading xanh'>{blue_user.name}</Typography>
            </Grid>
          </Grid>
          <Grid container className='score'>
            <Grid item xs={5} className='do_dam'>
              <Typography variant={mainTitle} component="h1" className='num_score'>0</Typography>
            </Grid>
            <Grid item xs={2} className='den'>
              <Typography variant={subTitle} className='center'>MATCH</Typography>
              <Typography variant={imContent} className='center'>{match}</Typography>
              <Typography variant={mainTitle} style={{ color : "#F8F905", marginRight : "1px" }} 
                className='center time'>
                  {time}
                  <Typography 
                    variant={imContent} 
                    style={{ backgroundColor : "#F8F905", color : "black" }}>
                      Time out
                  </Typography>
                </Typography>
            </Grid>
            <Grid item xs={5} className='xanh_dam'>
              <Typography variant={mainTitle} component="h1" className='num_score'>0</Typography>
            </Grid>
          </Grid>
          <Grid container className='footer'>
            <Grid item xs={5} className='do'>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant={subTitle} className='center' >Won</Typography>
                  <Typography variant={imContent} className='center'>{red_user.won}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={subTitle} className='center' >Hits</Typography>
                  <Typography variant={imContent} className='center'>{red_user.hits}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} className='den'>
              <Typography variant={subTitle} className='center'>ROUND</Typography>
              <Typography variant={imContent} className='center'>{round}</Typography>
            </Grid>
            <Grid item xs={5} className='xanh'>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant={subTitle} className='center' >Hits</Typography>
                  <Typography variant={imContent} className='center'>{blue_user.hits}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={subTitle} className='center' >Won</Typography>
                  <Typography variant={imContent} className='center'>{blue_user.won}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={propo} className='xanh'>
          {/* Layout bên dọc phải */}
          <Typography variant={mainTitle} className='flag heading'>.</Typography>
          <Typography variant={imContent} className='center score'>CLB</Typography>
          <Typography variant={subTitle} className='footer'>
            <Typography variant={subTitle} className='center' >Gam-Jeom</Typography>
            <Typography variant={imContent} className='center'>{blue_user.gam_jeom}</Typography>
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}

HienThi.defaultProps = {
  red_user : {
    name : "H1"
  },
  blue_user : {
    name : "H2"
  },
  time : "2:00",
  black_time : false,
  match : 100,
  round : 1
}

HienThi.propTypes = {
  red_user : PropTypes.object.isRequired,
  blue_user : PropTypes.object.isRequired,
  time : PropTypes.string.isRequired, // Thời gian đếm ngược
  // black_time : PropTypes.bool.isRequired, // Trạng thái thời gian nhấp nháy
  match : PropTypes.number.isRequired, // Trận đấu bao nhiêu
  round : PropTypes.number.isRequired // Vòng nào
}

export default HienThi;