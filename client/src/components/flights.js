import { css } from 'emotion'
import React, { Component, PropTypes, useRouter } from 'react'
import FlightCard from 'components/flight-card'
import Loader from 'components/loader'

import fetcherize from 'util/fetcher'

import useSWR from 'swr'

function Flights({ userId }) {

  const fetcher = fetcherize({
    data: {
      recordType: 'flight',
      action: 'retrieve'
    }
  })

  const url = userId ? `/records/flights/${userId}` : `/records/flights`

  const { data: flightsData, error } = useSWR(url, fetcher)
  const flights = flightsData && flightsData.filter(flight => {
    return flight.deletedAt === undefined
  }).sort((a,b) => {
    return new Date(b.date) - new Date(a.date)
  })
  const totalHours = flights && flights.reduce((total, flight) => {
    return total + Number(flight.durration)
  }, 0)
  if (error) return <div>failed to load{JSON.stringify(error)}</div>
  if (!flights) return <Loader />
  return (
    <div
      className={css(`
        // margin-top: -80px;
        // background: white;
      `)}>
      <h1>
        Total Flight Hours: {totalHours}
      </h1>
      { flights.map((flight, idx) => {
        return (
          <FlightCard
            key={flight.id || idx}
            flight={flight} 
          />
          )
      })}
    </div>
  )
}

export default Flights