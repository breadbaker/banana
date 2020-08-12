import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DisplaySignature from 'components/displaySignature'
import FlightLandIcon from '@material-ui/icons/FlightLand'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import moment from 'moment'
import { T } from 'antd/lib/upload/utils';

import { css } from 'emotion'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
    fontSize: 30,
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    fontSize: 11
  },
  remarks: {
    fontStyle: 'italic'
  },
  instructor: {}
});

function Detail({children}) {
  return (
    <span
     className={css(`
      font-size: 18px;
      font-weight: bold;
      text-decoration: underline;
      `)}>
      {children}
    </span>
  )
}

function MinorDetail({children}) {
  return (
    <span
     className={css(`
      font-size: 12px;
      margin-left: 10px;
      `)}>
      {children}
    </span>
  )
}

export default function FlightCard({ flight }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <h1
          className={css(`
          font-weight: bold;
          margin-top: 0px;
          margin-bottom: 5px;
          `)}>
          {moment(flight.date).format('l')}
        </h1>
        
        <Typography variant="body2" component="p">
          From <Detail>{flight.departingAirport}</Detail> to <Detail>{flight.arrivalAirport}</Detail> Flying on Aircraft <Detail>{flight.aircraft}</Detail> | Flight Durration: <Detail>{flight.durration}</Detail> hours
        </Typography>
        <p
          className={css`
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0px;
            height: 50px;
            svg {
              margin: 10px;
              width: 40px;
              height: 40px;
            }
            span {
            }
          `}>
          <FlightTakeoffIcon />
          <Detail>
            {Number(flight.takeoffs) + Number(flight.nightTakeoffs)}
          </Detail> 
          <MinorDetail>
            ({flight.takeoffs} day | {flight.nightTakeoffs} night)
          </MinorDetail>
          <FlightLandIcon />
          <Detail>
            {Number(flight.landings) + Number(flight.nightLandings)}
          </Detail>
          <MinorDetail>
            ({flight.landings} day | {flight.nightLandings} night)
          </MinorDetail>
        </p>
        <div
          className={css`
            display: flex;
            margin-bottom: -10px;
            font-size: 14px;
            align-items: center;
            justify-content: center;
            p {
              margin: 0px;
            }`}>
          <div
            className={css`
            display: inline-block;
            width: 50%;
            text-align: center;
          `}>
            {flight.remarks && <p
              className={css`
              font-style: italic`}>
              "{flight.remarks}"
            </p> }
              
            <br/>
            {flight.instructor && 
              <Typography className={classes.instructor}>
                Instructor: <Detail>{flight.instructor}</Detail>
              </Typography>
            }
          </div>
          <div
            className={css`
            display: inline-block;
            width: 50%;
            text-align: center;
          `}>
            <DisplaySignature
              signature={flight.signature}
            />
          </div>
        </div>


        
      </CardContent>
    </Card>
  );
}
// \
// <Typography className={classes.pos} color="textSecondary">


{/* <div key={idx}>
            <div>


              <Display
                label='Remarks'
                value={flight.remarks}
              />
            </div>
            <DisplaySignature
              signature={flight.signature}
            />
          </div> */}