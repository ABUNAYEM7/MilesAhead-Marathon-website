import React from 'react'
import Banner from '../../components/Banner/Banner'
import Marathons from '../../components/Marathons/Marathons'
import UpComingMarathons from '../../components/Marathons/UpComingMarathons'
import {Helmet} from "react-helmet";
import ManageYourEvent from '../../components/RiseEvent/ManageYourEvent';
import JoinMarathon from '../../components/JoinMarathon/JoinMarathon';
import Faq from '../../components/FAQ/Faq';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MilesAhead || Home</title>
      </Helmet>
      <header>
        <Banner/>
      </header>
      <section className='my-6 p-4'>
        <Marathons/>
      </section>
      <section>
        <UpComingMarathons/>
      </section>
      <section>
        <ManageYourEvent/>
      </section>
      <section>
        <JoinMarathon/>
      </section>
      <section>
        <Faq/>
      </section>
    </div>
  )
}

export default Home
