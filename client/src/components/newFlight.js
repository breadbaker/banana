import React, { Component, PropTypes, useRef, useState } from 'react'
import Input from 'components/input'
import Signature from 'components/signature'
import Submit from 'components/submit'
import Flights from 'components/flights'
import { css } from 'emotion'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
function NewFlight({ actions, flights }) {

  const [signature, setSignature] = useState('');
  const [aircraft, setAircraft] = useState('')
  const [date, setDate] = useState(new Date())
  const [departingAirport, setDepartingAirport] = useState('')
  const [arrivalAirport, setArrivalAirport] = useState('')
  const [durration, setDurration] = useState(0)
  const [takeoffs, setTakeoffs] = useState(0)
  const [landings, setLandings] = useState(0)
  const [nightTakeoffs, setNightTakeoffs] = useState(0)
  const [nightLandings, setNightLandings] = useState(0)
  const [remarks, setRemarks] = useState('')
  const [instructor, setInstructor] = useState('')

  const submit = function (e) {
    e.preventDefault()
    actions.saveFlight({
      signature,
      aircraft,
      date,
      departingAirport,
      arrivalAirport,
      durration,
      takeoffs,
      landings,
      nightTakeoffs,
      nightLandings,
      instructor,
      remarks
    })
    setSignature('')
    setAircraft('')
    setDate(new Date())
    setDepartingAirport('')
    setArrivalAirport('')
    setDurration(0)
    setTakeoffs(0)
    setLandings(0)
    setNightLandings(0)
    setNightTakeoffs(0)
    setRemarks('')
    setInstructor('')
  }

  const classes = useStyles();

  return (
    <div>
      <form
        onSubmit={submit}
        className={classes.root}
        noValidate autoComplete="off">
        <h1>New Flight</h1>
        <Input
          label='Aircraft'
          value={aircraft}
          update={setAircraft} />
        <Input
          label='Date'
          value={date}
          type='date'
          update={setDate} />
          <Input
            label='Departing Airport'
            value={departingAirport}
            update={setDepartingAirport} />
          <Input
            label='Arriving Airport'
            value={arrivalAirport}
            update={setArrivalAirport} />
          <Input
            label='Takeoffs'
            value={takeoffs}
            type='number'
            update={setTakeoffs} />
          <Input
            label='Landings'
            value={landings}
            type='number'
            update={setLandings} /> 
        <Input
          label='Night Takeoffs'
          value={nightTakeoffs}
          type='number'
          update={setNightTakeoffs} />
        <Input
          label='Night Landings'
          value={nightLandings}
          type='number'
          update={setNightLandings} /> 
        <Input
          label='Remarks'
          type='textarea'
          value={remarks}
          update={setRemarks} />
        <Input
          label='Instructor Name'
          value={instructor}
          update={setInstructor} />
        <Input
          label='Durration'
          value={durration}
          type='number'
          update={setDurration} />
        <Signature
          signature={signature}
          setSignature={setSignature} />
        <Submit label="Save Flight" />
      </form>
      <Flights />
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    flights: state.flights
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewFlight)