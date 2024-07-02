import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React from 'react'

import "./assets/css/Dashboard.css";

export default function Dashboard() {
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
                <Button fullWidth variant='contained' color='secondary'>Bắt đầu</Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant='contained' color='warning'>Dừng săn sóc / Tiếp tục</Button>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button fullWidth variant='contained' color='secondary'>Kết thúc</Button>
                </Grid>
                <Grid item xs={6}>
                  <Button fullWidth variant='contained' color='warning'>Dừng xem xét / Tiếp tục</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button fullWidth variant='contained' color='primary'>Xóa điểm</Button>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h4' className='center'>Thời gian</Typography>
          <Typography variant='h5' className='center'>
            Đặt lại hiệp <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select> phút <select>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select> giây <select>
              <option>00</option>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
              <option>05</option>
              <option>06</option>
              <option>07</option>
              <option>08</option>
              <option>09</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14</option>
              <option>15</option>
              <option>16</option>
              <option>17</option>
              <option>18</option>
              <option>19</option>
              <option>20</option>
              <option>21</option>
              <option>22</option>
              <option>23</option>
              <option>24</option>
              <option>25</option>
              <option>26</option>
              <option>27</option>
              <option>28</option>
              <option>29</option>
              <option>30</option>
              <option>31</option>
              <option>32</option>
              <option>33</option>
              <option>34</option>
              <option>35</option>
              <option>36</option>
              <option>37</option>
              <option>38</option>
              <option>39</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
              <option>43</option>
              <option>44</option>
              <option>45</option>
              <option>46</option>
              <option>47</option>
              <option>48</option>
              <option>49</option>
              <option>50</option>
              <option>51</option>
              <option>52</option>
              <option>53</option>
              <option>54</option>
              <option>55</option>
              <option>56</option>
              <option>57</option>
              <option>58</option>
              <option>59</option>
            </select>
          </Typography>
          <Button variant='contained' fullWidth color='error'>Bắt đầu lại</Button>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='h5' className='center'>Một hiệp:
                <select>
                  <option value="15">Thử 15 giây</option>
                  <option value="45">45 giây</option>
                  <option value="60">1 phút</option>
                  <option value="90">1 phút 30 giây</option>
                  <option value="120" selected="selected">2 phút</option>
                  <option value="150">2 phút 30 giây</option>
                  <option value="180">3 phút</option>
                  <option value="240">4 phút</option>
                  <option value="300">5 phút</option>
                  <option value="360">6 phút</option>
                  <option value="420">7 phút</option>
                  <option value="480">8 phút</option>
                  <option value="540">9 phút</option>
                  <option value="600">10 phút</option>
                </select>
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
            <select>
              {/* <!--option value="20">1/3 phút</option--> */}
              <option value="15">Thử 15 giây</option>
              <option value="30">30 giây</option>
              <option value="45">45 giây</option>
              <option value="60" selected="selected">1 phút</option>
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
                    <Button variant='contained'>+</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button>- -</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button>- - - -</Button>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField type='number' defaultValue={0} className='custom_tf' />
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button variant='contained'>+</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button>- -</Button>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
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
                    <Button variant='contained'>+</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button>- -</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button>- - - -</Button>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <Grid container spacing={1}>
                  <Grid item>
                    <TextField type='number' defaultValue={0} className='custom_tf' />
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button variant='contained'>+</Button>
                  </Grid>
                  <Grid item className='dashboard_center'>
                    <Button>- -</Button>
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
