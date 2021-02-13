import React, { useState } from 'react'
import Flights from 'components/flights'

function Records() {
  const userId = window.location.pathname.split('records/')[1]
  return (
    <div>
        <Flights userId={userId} />
    </div>
  );
}

export default Records