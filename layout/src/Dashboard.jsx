import React, { useRef } from 'react'
import PropTypes from 'prop-types';
import { 
  Button, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  Typography 
} from '@mui/material'
import "./assets/css/Dashboard.css";
import Minutes from './components/Minutes';
import Seconds from './components/Seconds';

function Dashboard(props) {
  const minuteRound = useRef();
  const secondRound = useRef();
  const scoreForStopFourRound = useRef(); // Điểm dừng hiệp
  const timeForPrep = useRef(); // Thời gian nghỉ giữa hiệp
  const round = useRef();
  const againMinuteRound = useRef();
  const againSecondRound = useRef();
  const { 
    onStart, 
    onEnd, 
    onStopForCaring, 
    onStopForConsidering, 
    onClearScore,
    onRestart,
    onChangeScore,
    onChangeGamJeom,
    disabled 
  } = props;

  const gatherInput = () => {
    return {
      timeRound : Number(minuteRound.current.value) * 60 + Number(secondRound.current.value),
      round_4 : Number(scoreForStopFourRound.current.value),
      preparation_time : Number(timeForPrep.current.value)
    }
  };

  return (
    <>
      <Typography variant='h2' className='center' >Bảng điều khiển</Typography>
      <Typography variant='h4' className='center'>Cài đặt trận đấu</Typography>
      <Grid container spacing={1}>
        {/* Các nút lệnh quản lí */}
        <Grid item xs={6}>
          <Grid container spacing={2} marginBottom={2}>
            <Grid container item spacing={2}>
              <Grid item xs={6}>
                {/* Cần cài đặt để gửi một số thông tin về server */}
                <Button 
                  disabled={disabled.start}
                  onClick={
                    () => {
                      // console.log(minuteRound.current.value);
                      // console.log(secondRound.current.value);
                      onStart(gatherInput());
                    }
                  }
                  fullWidth 
                  variant='contained' 
                  color='secondary'
                >Bắt đầu</Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                  disabled={disabled.caring}
                  onClick={onStopForCaring}
                  fullWidth 
                  variant='contained' 
                  color='warning'
                >Dừng săn sóc / Tiếp tục</Button>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button 
                    onClick={onEnd}
                    fullWidth 
                    variant='contained' 
                    color='secondary'>Kết thúc</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    disabled={disabled.considering}
                    onClick={onStopForConsidering}
                    fullWidth 
                    variant='contained' 
                    color='warning'>Dừng xem xét / Tiếp tục</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button 
            disabled={disabled.clear_score}
            onClick={onClearScore}
            fullWidth 
            variant='contained' 
            color='primary'>Xóa điểm</Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h4' className='center'>Thời gian</Typography>
          <Typography variant='h5' className='center'>
            {/* Thông tin object rời (dùng để set trận đấu khi đặt lại được ấn -->
            chỉ cài cho đặt lại) */}
            Đặt lại hiệp <select ref={round}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              </select> phút <select ref={againMinuteRound}>
                <Minutes />
              </select> giây <select ref={againSecondRound}>
                <Seconds />
            </select>
          </Typography>
          <Typography variant='h5' className='center'>
            Điểm dừng hiệp 4: <select ref={scoreForStopFourRound} defaultValue="1">
              <Minutes />
            </select>
          </Typography>
          <Button
            onClick={
              () => {
                onRestart({
                  round : round.current.value,
                  time : Number(againMinuteRound.current.value) * 60 + Number(againSecondRound.current.value)
                })
              }
            } 
            variant='contained' 
            fullWidth 
            color='error'>Bắt đầu lại</Button>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='h5' className='center'>
                Một hiệp: <select ref={minuteRound} defaultValue={1}>
                  <Minutes />
                </select> phút <select ref={secondRound}>
                  <Seconds />
                </select> giây
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h5' className='center'>TG Khớp khím:
                <select>
                  <option value="1000">1.0 giây</option>
                  <option value="1500">1.5 giây</option>
                  <option value="2000">2.0 giây</option>
                </select>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant='h5' className='center'>Nghỉ giữa hiệp:
            <select defaultValue={"60"} ref={timeForPrep}>
              <option value="15">Thử 15 giây</option>
              <option value="30">30 giây</option>
              <option value="45">45 giây</option>
              <option value="60">1 phút</option>
              <option value="90">1 phút 30 giây</option>
            </select>
          </Typography>
        </Grid>
      </Grid>
      <Typography variant='h4' className='center'>Quản lí</Typography>
      <TableContainer component={Paper} className='dashboard_center'>
        <Table sx={{ width : 900 }}>
          <TableHead>
            <TableRow>
              <TableCell className='dashboard_heading'>Mã màu</TableCell>
              <TableCell className='dashboard_heading'>Tên</TableCell>
              <TableCell className='dashboard_heading'>Điểm</TableCell>
              <TableCell className='dashboard_heading'>Lỗi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Màu đỏ */}
            <TableRow>
              <TableCell align='center' style={{ color : "red", fontWeight : "bold", fontSize : "1rem" }} >Đỏ</TableCell>
              <TableCell>
                <TextField className='custom_tf' />
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField type='number' defaultValue={0} className='custom_tf' />
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button onClick={
                      () => {
                        onChangeScore("R", 1)
                      }
                    } variant='contained'>+</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button onClick={
                      () => {
                        onChangeScore("R", -1)
                      }
                    }>- -</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button onClick={
                      () => {
                        onChangeScore("R", -1)
                      }
                    }>- - - -</Button>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField type='number' defaultValue={0} className='custom_tf' />
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button onClick={
                      () => {
                        onChangeGamJeom("R", 1);
                      }
                    } variant='contained'>+</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button disabled onClick={
                      () => {
                        onChangeGamJeom("R", -1);
                      }
                    }>- -</Button>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
            {/* Màu xanh */}
            <TableRow>
              <TableCell align='center' style={{ color : "blue", fontWeight : "bold", fontSize : "1rem" }}>Xanh</TableCell>
              <TableCell>
                <TextField className='custom_tf' />
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField type='number' defaultValue={0} className='custom_tf' />
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button onClick={
                      () => {
                        onChangeScore("B", 1)
                      }
                    } variant='contained'>+</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button onClick={
                      () => {
                        onChangeScore("B", -1);
                      }
                    }>- -</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button onClick={
                      () => {
                        onChangeScore("B", -1);
                      }
                    }>- - - -</Button>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField type='number' defaultValue={0} className='custom_tf' />
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button onClick={
                      () => {
                        onChangeGamJeom("B", 1);
                      }
                    } variant='contained'>+</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button disabled onClick={
                      () => {
                        onChangeGamJeom("B", -1);
                      }
                    }>- -</Button>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

Dashboard.propTypes = {
  onStart : PropTypes.func.isRequired, //Bắt đầu hiệp đấu
  onEnd : PropTypes.func.isRequired,
  onStopForCaring : PropTypes.func.isRequired,
  onStopForConsidering : PropTypes.func.isRequired,
  onRestart : PropTypes.func.isRequired,
  onClearScore : PropTypes.func.isRequired,
  onChangeScore : PropTypes.func.isRequired,
  onChangeGamJeom : PropTypes.func.isRequired,
  disabled : PropTypes.object.isRequired
};

export default Dashboard;