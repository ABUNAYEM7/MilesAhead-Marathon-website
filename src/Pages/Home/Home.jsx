import React from 'react'
import Banner from '../../components/Banner/Banner'
import Marathons from '../../components/Marathons/Marathons'
import UpComingMarathons from '../../components/Marathons/UpComingMarathons'

const Home = () => {
  return (
    <div>
      <header>
        <Banner/>
      </header>
      <section className='my-6 p-4'>
        <Marathons/>
      </section>
      <section>
        <UpComingMarathons/>
      </section>
    </div>
  )
}

export default Home
