import React from 'react'
import EndorsementCard from 'components/endorsement-card'
import Loader from 'components/loader'
import fetcherize from 'util/fetcher'
import useSWR from 'swr'

function Endorsements() {
  const fetcher = fetcherize({
    data: {
      recordType: 'endorsement',
      action: 'retrieve'
    }
  })

  const { data: endorsementsData, error } = useSWR(`/records/endorsements`, fetcher)
  const endorsements = endorsementsData && endorsementsData.sort((a,b) => {
    return new Date(b.date) - new Date(a.date)
  }).filter(flight => {
    return flight.deletedAt === undefined
  })
  const totalHours = endorsements && endorsements.reduce((total, flight) => {
    return total + Number(flight.durration)
  }, 0)
  if (error) return <div>failed to load{JSON.stringify(error)}</div>
  if (!endorsements) return <Loader />
  return (
    <div>
      { endorsements.map((endorsement, idx) => {
        return (
          <EndorsementCard
            key={endorsement.id || idx}
            endorsement={endorsement} 
          />
          )
      })}
    </div>
  )
}


export default Endorsements