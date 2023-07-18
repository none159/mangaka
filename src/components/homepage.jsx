import React, { useState, useEffect, useRef } from 'react'
import Nav from './navbar'
import Hero from './hero'
import axios from 'axios'
import Mangasearch from './mangasearchinfo'
import Topmg from './trendingmang'
import Footer from './footer'
const Home = () => {
    const [search, setsearch] = useState('')
    const [data, setdata] = useState('')
    const fetchdata = () => {
        axios.get(`https://api.jikan.moe/v4/manga?q=${search}&limit=1`).then((res) => {
            setdata(res.data.data)
        }).catch(err => console.log(err))
    }
    useEffect(() => {

        fetchdata()

    }, [search])
    return (
        <>
            <Nav search={search} setsearch={setsearch} />
            {search != '' ? <Mangasearch data={data} /> : <Hero setsearch={setsearch} />}
            <Footer />

        </>
    )
}
export default Home;