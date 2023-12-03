import React from 'react';

import '../components/homepage/homepage.css';
import NameCardContainer from '../components/homepage/NameCardContainer'

export default function Homepage() {
  
  return (
    <div className='homepage'>
        <p className='header'>Directory</p>
        <div>
          <NameCardContainer />
        </div>
    </div>
  )
}