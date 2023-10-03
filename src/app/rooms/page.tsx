'use client'
import React from 'react'
import styled from 'styled-components'
import { Filters, ProductList, Sort } from '@/components'

const Rooms = () => {
  return (
    <Wrapper>
      <div className='main-text'>
        <h1 className='page-title'>ROOMS</h1>
        <div className='text'>
          REFINED, SOPHISTICATED, SMART AND SIMPLE, YET FLAMBOYANT AND
          PROVOCATIVE, ALL AT THE SAME TIME. UNIVERSALLY APPEALING HOTEL ROOMS
          ARE THOUGHTFULLY DESIGNED, DOWN TO EVERY LAST FINISH AND DETAIL, WITH
          DISTINCT ZONES FOR SLEEPING, RELAXING, WORKING AND ENTERTAINING. WE'VE
          INTEGRATED SEAMLESS SMART HOTEL TECHNOLOGY SO EVERYTHING YOU NEED IS
          WITHIN ARM'S REACH AND RIGHT AT YOUR FINGERTIPS. A STAY AT NYC'S
          PUBLIC HOTEL OFFERS ALL THE COMFORTS OF HOME, BUT BETTER.
        </div>
      </div>
      <Filters />
      <Sort />
      <ProductList />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: white;
  .main-text {
    max-width: 1243px;
    margin: auto;
    padding-top: 30px;
  }
  .text {
    margin-top: 20px;
  }
  h1 {
    margin-left: -3px;
  }
  @media screen and (max-width: 1068px) {
    padding: 18px;
    .text {
      color: red;
    }
  }
  @media screen and (max-width: 768px) {
    .text {
      color: #ff9500e1;
    }
  }
`

export default Rooms
