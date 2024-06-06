import { Filters, ProductList, Sort } from '@/components/ecommerce'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rooms | React App',
}

const Rooms = () => {
  return (
    <div className='room-page'>
      <div className='room-center'>
        <h1>E-COMMERCE</h1>
        <div>
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
    </div>
  )
}

export default Rooms
