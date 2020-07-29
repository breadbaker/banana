import React, { Component, PropTypes, useRef, useState } from 'react'
import Input from 'components/input'
import Signature from 'components/signature'
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
  const [remarks, setRemarks] = useState('')

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
      <Input
        label='Departing Airport'
        value={departingAirport}
        update={setDepartingAirport} />
      <Input
        label='Arriving Airport'
        value={arrivalAirport}
        update={setArrivalAirport} />
      <Input
        label='Durration'
        value={durration}
        type='number'
        update={setDurration} />
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
        label='Remarks'
        value={remarks}
        update={setRemarks} />
      <Signature
        signature={signature}
        setSignature={setSignature} />
      <input
        className={css`
          background-color: blue;
          border-radius: 7px;
          color: white;
          display: block;
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          padding-top: 5px;
          padding-bottom: 5px;
          font-size: 16px;
          :active {
            background-color: yellow;
          };
      ` }
        type="submit"
        value="Save" />

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