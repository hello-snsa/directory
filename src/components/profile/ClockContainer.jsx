import React from 'react';

export default function ClockContainer({newTime}) {
  
  return (
    <div className='clock-container'>
        <h1>{newTime}</h1>
    </div>
  )
}