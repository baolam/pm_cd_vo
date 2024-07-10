import React from 'react';
import PropTypes from 'prop-types';
import { 
  Grid,
  Typography
} from '@mui/material';

import "./assets/css/HienThi.css";

// Tỉ lệ giao diện
const propo = 1.25;
const mainScorePropo = 3.5;
const subTitle = "h6";
const imTitle = "h3";
const mainTitle = "h1";

function HienThi(props) {
  const { red_user, blue_user, match, round, time, pauseTime } = props;

  return (
    <div className='hien_thi'>
      <Grid container>
        <Grid item xs={propo} className='do'>
          {/* Layout bên dọc trái */}
          <Typography variant={mainTitle} className='heading flag'>.</Typography>
          <Typography variant={imTitle} className='center score'>{red_user.team}</Typography>
          <div className='footer'>
            <Typography variant={subTitle} className='center' >Gam-Jeom</Typography>
            <Typography variant={imTitle} className='center'>{red_user.gam_jeom}</Typography>
          </div>
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
            <Grid item xs={(12 - mainScorePropo) / 2} className='do_dam'>
              <Typography style={{
                fontSize : "15rem"
              }} variant={mainTitle} component={mainTitle}>{red_user.scores}</Typography>
            </Grid>
            <Grid item xs={mainScorePropo} className='den'>
              <Typography variant={imTitle} className='center' style={{
                fontSize : "2.5rem"
              }}>MATCH</Typography>
              <Typography variant="h2" className='center'>{match}</Typography>
              <Typography variant="h2" style={{ color : pauseTime ? "#F8F905" : "white", marginRight : "1px" }} 
                className='center time'>
                  <span style={{ fontSize : "6.5rem" }} >{time}</span>
                  {pauseTime && 
                    <Typography 
                      variant={imTitle}
                      style={{ backgroundColor : "#F8F905", color : "black", textTransform : "uppercase" }}>
                        Time out
                    </Typography>
                  }
                </Typography>
            </Grid>
            <Grid item xs={(12 - mainScorePropo) / 2} className='xanh_dam'>
              <Typography style={{
                fontSize : "15rem"
              }} variant={mainTitle} component={mainTitle} >{blue_user.scores}</Typography>
            </Grid>
          </Grid>
          <Grid container className='footer'>
            <Grid item xs={(12 - mainScorePropo) / 2} className='do'>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant={subTitle} className='center green' >Won</Typography>
                  <Typography variant={imTitle} className='center green'>{red_user.won}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={subTitle} className='center green' >Hits</Typography>
                  <Typography variant={imTitle} className='center green'>{red_user.hits}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={mainScorePropo} className='den'>
              <Typography variant={imTitle} className='center'>ROUND</Typography>
              <Typography variant={imTitle} className='center'>{round}</Typography>
            </Grid>
            <Grid item xs={(12 - mainScorePropo) / 2} className='xanh'>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant={subTitle} className='center green' >Hits</Typography>
                  <Typography variant={imTitle} className='center green'>{blue_user.hits}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant={subTitle} className='center green' >Won</Typography>
                  <Typography variant={imTitle} className='center green'>{blue_user.won}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={propo} className='xanh'>
          {/* Layout bên dọc phải */}
          <Typography variant={mainTitle} className='flag heading'>.</Typography>
          <Typography variant={imTitle} className='center score'>{blue_user.team}</Typography>
          <div className='footer'>
            <Typography variant={subTitle} className='center' >Gam-Jeom</Typography>
            <Typography variant={imTitle} className='center'>{blue_user.gam_jeom}</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

/**
 * Cấu trúc của một user
 * {
 *  name : ...,
 *  gam_jeom : ....,
 *  hits : ....,
 *  won : ...,
 *  team : ...,
 *  scores : ...
 * }
 * 
 */

HienThi.propTypes = {
  red_user : PropTypes.object.isRequired,
  blue_user : PropTypes.object.isRequired,
  time : PropTypes.string.isRequired, // Thời gian đếm ngược
  pauseTime : PropTypes.bool.isRequired,
  match : PropTypes.number.isRequired, // Trận đấu bao nhiêu
  round : PropTypes.number.isRequired // Vòng nào
}

export default HienThi;