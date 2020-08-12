import React, { Component, PropTypes, useRef, useState } from 'react'
import Input from 'components/input'
import NumberRange from 'components/number-range-input'
import Signature from 'components/signature'
import Submit from 'components/submit'
import Form from 'components/form'
import Flights from 'components/flights'
import { css } from 'emotion'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';

function NewFlight({ actions }) {

  const [signature, setSignature] = useState('');
  const [saving, setSaving] = useState(false);
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

  const submit = function () {
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
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
    }, 200)
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

  return (
    <div
      className={css`
          background-color: ${saving ? '#80808030' : 'transparent'};
        `}>
      <Form
        onSubmit={submit}>
        <Input
          label='Aircraft'
          value={aircraft}
          update={setAircraft} />
        <Input
          label='Date'
          value={moment(date).format('YYYY-MM-DD')}
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
          <NumberRange
            label='Takeoffs'
            value={takeoffs}
            min={0}
            max={10}
            update={setTakeoffs} />
          <NumberRange
            min={0}
            max={10}
            label='Landings'
            value={landings}
            type='number'
            update={setLandings} /> 
        <NumberRange
          min={0}
          max={10}
          label='Night Takeoffs'
          value={nightTakeoffs}
          type='number'
          update={setNightTakeoffs} />
        <NumberRange
          min={0}
          max={10}
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
        <div
            className={css`
            width: 100%;
          `}>
          <Signature
            signature={signature}
            setSignature={setSignature} />
          <Submit label="Save Flight" />
        </div>
      </Form>
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