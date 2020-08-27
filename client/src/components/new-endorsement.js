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
import EndorsementMap from 'util/endorsements-map'
import Button from '@material-ui/core/Button';
const categories = Object.keys(EndorsementMap)
// import { debounce } from "throttle-debounce"
import { makeStyles } from '@material-ui/core/styles';
import endorsements from './endorsements'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function NewEndorsement({ actions }) {

  const [category, setCategory] = useState()
  const first = {
    section: 'A.1',
    title: 'Prerequisites for practical test: Title 14 of the Code of Federal Regulations(14 CFR) part 61, § 61.39(a)(6)(i) and (ii).',
    text: 'I certify that [First name, MI, Last name] has received and logged training time within 2 calendar-months preceding the month of application in preparation for the practical test and [he or she] is prepared for the required practical test for the issuance of [applicable] certificate.'
  }
  const [endorsement, setEndoresment] = useState()
  const [aircraft, setAircraft] = useState('')
  const [licenseType, setLicenseType] = useState('')
  const [aircraftMake, setAircraftMake] = useState('')
  const [signature, setSignature] = useState('')
  const [date, setDate] = useState(new Date())
  const [instructor, setInstructor] = useState('')
  const [instructorCFI, setInstructorCFI] = useState('')
  const [departingAirport, setDepartingAirport] = useState('')
  const [arrivalAirport, setArrivalAirport] = useState('')
  const [airports, setAirports] = useState('')
  const [comments, setComments] = useState('')
  const [route, setRoute] = useState('')
  const [aircraftCategory, setAircraftCategory] = useState('')
  const [documentType, setDocumentType] = useState('')
  const [documentNumber, setDocumentNumber] = useState('')
  const [airspace, setAirspace] = useState('')
  const [airport, setAirport] = useState('')

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState({})

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

    setEndoresment()
    setAircraft('')
    setLicenseType('')
    setAircraftMake('')
    setSignature('')
    setDate(new Date())
    setInstructor('')
    setInstructorCFI('')
    setDepartingAirport('')
    setArrivalAirport('')
    setAirports('')
    setComments('')
    setRoute('')
    setAircraftCategory('')
    setDocumentType('')
    setDocumentNumber('')
    setAirspace('')
    setAirport('')

    canvas.current.clear()
  }

  // const licenseType ='private pilot'
  const pilotName = 'dbaaoeuaoe'


  return (
    <div
      className={css`
          background-color: ${saving ? '#80808030' : 'transparent'};
        `}>
      { !category && categories.map(cat => {
          return <Card
                  key={cat}
                  className={css`
                    margin-bottom: 20px;
                    :hover {
                      cursor: pointer;
                    }
                  `}
                  onClick={() => {
                    setCategory(EndorsementMap[cat])
                  }}>
              <CardContent>
                {EndorsementMap[cat].label}
              </CardContent>
            </Card>
        })
      }
      {
        category && !endorsement &&
        Object.keys(category.endorsements).map(endorsementKey => {
          const endorsementItem = category.endorsements[endorsementKey]
          return <Card
                key={endorsementKey}
                className={css`
                  margin-bottom: 20px;
                  :hover {
                    cursor: pointer;
                  }
                `}
                onClick={() => {
                  setEndoresment(endorsementItem)
                }}>
            <CardContent>
              {endorsementItem.section}) {endorsementItem.title}
            </CardContent>
          </Card>
        })
      }
      {
        category && endorsement &&
        <Form
          onSubmit={submit}>
          <div
            className={css`
            width: 100%;
          `}>
            <p>
              {endorsement.section}) {endorsement.title}
            </p>
            <Input
              label='Date'
              disabled
              value={moment(date).format('YYYY-MM-DD')}
              type='date'
              update={setDate} />
          </div>
          { endorsement.fields.map(field => {
            return <Input
              label={field}
              value={eval(field)}
              update={eval(`set${capitalizeFirstLetter(field)}`)} />
            })
          }
          <Input
            label='Instructor Name'
            value={instructor}
            update={setInstructor} />
          <Input
            label='Instructor CFI'
            value={instructorCFI}
            update={setInstructorCFI} />
          <div
              className={css`
              width: 100%;
            `}>
            <Signature
              signature={signature}
              setSignature={setSignature} />
            <p>{endorsement.text({
              pilotName,
              licenseType,
              aircraft,
              aircraftMake,
              departingAirport,
              arrivalAirport,
              airports,
              airport,
              comments,
              route,
              aircraftCategory,
              documentType,
              documentNumber,
              airspace
            })}</p>
            {/* <p>{getEndorsementText(endorsement)}</p> */}
            <Submit label="Save Endorsement" />
          </div>
        </Form>
      }
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
)(NewEndorsement)