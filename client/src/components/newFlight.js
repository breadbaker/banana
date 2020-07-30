import React, { Component, PropTypes, useRef, useState } from 'react'
import Input from 'components/input'
import Signature from 'components/signature'
import Submit from 'components/submit'
import { css } from 'emotion'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from 'actions'
function NewFlight({ actions }) {

  const [signature, setSignature] = useState('');
  const [aircraft, setAircraft] = useState('')
  const [date, setDate] = useState(null)
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
  }


  return (
    <form onSubmit={submit}>
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
      <div>
        <Input
          label='Departing Airport'
          value={departingAirport}
          update={setDepartingAirport} />
        <Input
          label='Arriving Airport'
          value={arrivalAirport}
          update={setArrivalAirport} />
      </div>
      <div>
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
      </div>
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
  );
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(NewFlight)