import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DisplaySignature from 'components/displaySignature'
import FlightLandIcon from '@material-ui/icons/FlightLand'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff'
import moment from 'moment'
import Signature from 'components/signature'
import fetcherize from 'util/fetcher'
import useSWR, { mutate } from 'swr'
import { css } from 'emotion'

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
  const [editing, setEditing] = useState(false);
  const [signature, setSignature] = useState('');

  return (
    <Card
      className={css(`
        margin-bottom: 19px;
      `)}>
      <CardContent>
        <div onClick={() => {
          setEditing(!editing)
        }}>
          <h1
            className={css(`
            font-weight: bold;
            margin-top: 0px;
            margin-bottom: 5px;
            `)}>
            {moment(flight.date).format('l')}
            <div
              className={css(`
              display: inline-block;
              float: right;
              font-size: 12px;
              `)}>
              hours: <Detail>{flight.durration}</Detail> 
            </div>
          </h1>
          
          <Typography variant="body2" component="p">
            From <Detail>{flight.departingAirport}</Detail> to <Detail>{flight.arrivalAirport}</Detail> Flying on Aircraft <Detail>{flight.aircraft}</Detail>
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
              // margin-bottom: -10px;
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
                <Typography>
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
        </div>
        {editing &&
          <div>
            <Button onClick={() => {
              fetcherize({
                data: {
                  ...flight,
                  deletedAt: new Date(),
                  recordType: 'flight',
                  action: 'update'
                }
              })('/records/flights').then(() => {
                mutate('/records/flights')
              })
              setEditing(false)
            }} variant="contained" color="secondary">
              Delete Flight Log Record
            </Button>
            { !flight.signature &&
              <div>
                <Signature
                  signature={signature}
                  setSignature={setSignature} />
                <Button onClick={() => {
                  fetcherize({
                    data: {
                      ...flight,
                      signature,
                      recordType: 'flight',
                      action: 'update'
                    }
                  })('/records/flights').then(() => {
                    mutate('/records/flights')
                  })
                  setEditing(false)
                }} variant="contained" color="primary">
                  Save Signature
                </Button>
              </div>
            }
          </div>
        }        
      </CardContent>
    </Card>
  );
}