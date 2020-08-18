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
// import { debounce } from "throttle-debounce"
import { makeStyles } from '@material-ui/core/styles';


const cachedValues = function(key) {
  try {
    const values = JSON.parse(localStorage.getItem(key))
    if (!Array.isArray(values)) {
      return []
    }
    return values
  } catch (err) {
    return []
  }
}
const cacheValue = function(key, value) {
  if (!value) {
    return
  }
  const values = cachedValues(key)
  if (!values.includes(value)) {
    values.push(value)
    localStorage.setItem(key, JSON.stringify(values))
  }
}

const newFlightData = function() {
  const [aircraft, setAircraft] = useState()

  return {
    signature: '',
    saving: false,
    aircraft
  }
}

function NewFlight({ actions }) {

  const [signature, setSignature] = useState('')
  const [firstRender, setFirstRender] = useState(true)
  const [saving, setSaving] = useState(false)
  const [aircraft, setAircraft] = useState()
  const airports = cachedValues('airports')
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
  const [error, setError] = useState({})

  const resetFlight = function() {
    setFirstRender(false)

    const aircrafts = cachedValues('aircraft')
    const instructors = cachedValues('instructor')
    const airports = cachedValues('airports')
    const mostRecentAirport = airports.length ? airports[airports.length - 1] : ''

    setSignature('')
    setAircraft(aircrafts.length ? aircrafts.pop() : '')
    setDate(new Date())
    setDepartingAirport(mostRecentAirport)
    setArrivalAirport(mostRecentAirport)
    setDurration(0)
    setTakeoffs(0)
    setLandings(0)
    setNightLandings(0)
    setNightTakeoffs(0)
    setRemarks('')
    setInstructor(instructors.length ? instructors.pop() : '')
    setError({})
  }

  if (firstRender) {
    resetFlight()  
  }

  const submit = function () {
    if (!durration) {
      setError({
        durration: 'Required'
      })
      return
    } 
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

    cacheValue('aircraft', aircraft)
    cacheValue('airports', departingAirport)
    cacheValue('instructor', instructor)
    resetFlight()

    canvas.current.clear()
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
            update={value => {
              setDepartingAirport(value.toUpperCase())
            }} />
          <Input
            label='Arriving Airport'
            value={arrivalAirport}
            update={value => {
              setArrivalAirport(value.toUpperCase())
            }} />
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
          label='Instructor Name'
          value={instructor}
          update={setInstructor} />
        <Input
          label='Durration'
          value={durration}
          type='number'
          required={true}
          error={error.durration}
          helperText={'Required'}
          update={setDurration} />
        <Input
          label='Remarks'
          type='textarea'
          multiline={true}
          value={remarks}
          update={setRemarks} />
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