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
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function Segment({children}) {
  return (
    <span
     className={css(`
      line-height: 65px;
      `)}>
      {children}
    </span>
  )
}

const getFields = endorsement => {

}
function NewEndorsement({ actions }) {

  const [category, setCategory] = useState()
  const [endorsement, setEndoresment] = useState()
  const [aircraft, setAircraft] = useState('')
  const [licenseType, setLicenseType] = useState('')
  const [pilotName, setPilotName] = useState('')
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
    setError({})

    const variables = endorsement.text.match(/{{[a-z|A-Z]+}}/g).map(varItem => {
      return varItem.replace(/[{}]/g, "")
    })
    
    const err = variables.reduce((memo,field) =>{
      if (!eval(field)) {
        memo[field] = 'required'
      }

      return memo
    }, {})

    if (Object.keys(err).length) {
      setError(err)
      return
    }

    const saveObj = variables.reduce((memo, field) => {
      memo[field] = eval(field)
      return memo
    }, {
      pilotName: 'Dan'
    })

    actions.saveEndorsement(
      saveObj
    )

    variables.forEach(field => {
      eval(`set${capitalizeFirstLetter(field)}`)('')
    })
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
    }, 200)


    setSignature('')
    setDate(new Date())

    canvas.current.clear()
  }



  const chunks = []

  if (endorsement) {
  const variables = endorsement.text.match(/{{[a-z|A-Z]+}}/g)

    const remainder = variables.reduce((remainingText, inputItem, idx) => {
      const broken = remainingText.split(inputItem)
      const left = broken[0]
      const right = broken[1]
      chunks.push(<Segment key={idx}>{left}</Segment>)
      const field = inputItem.replace(/[{}]/g, "")
      chunks.push(<Input
        label={field}
        key={field}
        value={eval(field)}
        error={error[field]}
        update={eval(`set${capitalizeFirstLetter(field)}`)} />)
      // chunks.push(<Segment>{`react:${inputItem}`}</Segment>)
      return right
    }, endorsement.text)
  
    chunks.push(<Segment key="remainder">{remainder}</Segment>)
  }


  // const pilotName = 'aoeu'


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
              error={error.date}
              update={setDate} />
          </div>
          <Input
            label='Instructor Name'
            value={instructor}
            err
            update={setInstructor} />
          <Input
            label='Instructor CFI'
            value={instructorCFI}
            update={setInstructorCFI} />
          <div
              className={css`
              width: 100%;
            `}>
            { chunks.map(item => {
              return item
            })}
            <Signature
              signature={signature}
              setSignature={setSignature} />
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