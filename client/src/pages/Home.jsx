import React from 'react'
import Navbar from '../components/Navbar'
import Home_Hero from '../components/Home_Hero'
import Home_Feature from '../components/Home_Feature'
import Home_Brands from '../components/Home_Brands'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <div>
            <Navbar />
            <Home_Hero />
            <Home_Feature/>
            <Home_Brands/>
            <Footer/>
        </div>
    )
}

export default Home