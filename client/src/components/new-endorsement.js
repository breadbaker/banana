import React, { Component, PropTypes, useRef, useState } from 'react'
import Input from 'components/input'
import Signature from 'components/signature'
import Submit from 'components/submit'
import Form from 'components/form'
import Button from '@material-ui/core/Button';
import { css } from 'emotion'
import moment from 'moment'
import EndorsementMap from 'util/endorsements-map'
const categories = Object.keys(EndorsementMap)
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import fetcherize from 'util/fetcher'
import useSWR from 'swr'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
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

function NewEndorsement({ actions, dispatch }) {
  const fetcher = fetcherize({
    data: {
      recordType: 'endorsement',
      action: 'retrieve'
    }
  })

  const { data: endorsementsData, error: loadEndError } = useSWR(`/records/endorsements`, fetcher)

  const endorsementsCollected = endorsementsData && endorsementsData.reduce((memo,item) => {
    if (item.deletedAt === undefined) {
      memo[item.categoryKey] = memo[item.categoryKey] || {}
      memo[item.categoryKey][item.endorsementKey] = true
    }

    return memo
  }, {})

  const [category, setCategory] = useState()
  const [endorsement, setEndorsement] = useState()
  const [categoryKey, setCategoryKey] = useState()
  const [endorsementKey, setEndorsementKey] = useState()
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

    variables.push('instructor')
    variables.push('instructorCFI')
    
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
      pilotName: 'Dan',
      action: 'store',
      recordType: 'endorsement',
      endorsementKey,
      categoryKey,
      signature
    })

    const response = fetcherize({
      data: saveObj
    })('/records/endorement')

    variables.push('endorsementKey')
    variables.push('categoryKey')

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
      return right
    }, endorsement.text)
  
    chunks.push(<Segment key="remainder">{remainder}</Segment>)
  }

  return (
    <div
      className={css`
          background-color: ${saving ? '#80808030' : 'transparent'};
        `}>
      { !categoryKey && categories.map(cat => {
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
                    setCategoryKey(cat)
                  }}>
              <CardContent>
                {EndorsementMap[cat].label}
              </CardContent>
            </Card>
        })
      }
      {
        categoryKey && !endorsementKey &&
        <div>
          <Button onClick={() => {
            setCategoryKey('')
          }} variant="contained" color="primary">
            Back
          </Button>
          {Object.keys(category.endorsements).map(endorsementKey => {
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
                    setEndorsement(endorsementItem)
                    setEndorsementKey(endorsementKey)
                  }}>
              <CardContent>
                {endorsementsCollected[categoryKey] && endorsementsCollected[categoryKey][endorsementKey] &&
                  <div
                    className={css`
                      margin: 10px;
                      display: inline-block;
                    `}>
                    <CheckCircleIcon />
                  </div>
                }
                {endorsementItem.section}) {endorsementItem.title}
              </CardContent>
            </Card>
          })}
        </div>
      }
      {
        categoryKey && endorsementKey &&
        <div>
          <Button onClick={() => {
            setEndorsementKey('')
          }} variant="contained" color="primary">
            Back
          </Button>
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
              error={error.instructor}
              update={setInstructor} />
            <Input
              label='Instructor CFI'
              error={error.instructorCFI}
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
        </div>
      }
    </div>
  );
}

export default NewEndorsement