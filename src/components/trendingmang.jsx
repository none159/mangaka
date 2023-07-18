import React, { useState, useEffect } from 'react'
import Nav from './navbar'
import Footer from './footer'
import axios from 'axios'
import Mangasearch from './mangasearchinfo'
const Trending = () => {
    const [topmanga, settopmanga] = useState('')
    const [trendmanga, settrendmanga] = useState('')
    let num = 0;

    const topmg = () => {
        axios.get('https://api.jikan.moe/v4/top/manga').then((res) => settopmanga(res.data.data)).catch((err) => console.log(err))

    }

    useEffect(() => {
        topmg()
    }, [])
    return (
        <>
            <Nav />
            {trendmanga != '' ? <Mangasearch data={trendmanga} /> : <section>
                <div className='trending-container'>
                    <h1>Trending : </h1>

                    {topmanga != '' ? topmanga.map((top) => {
                        return (

                            <div className='trending' key={top.title} onClick={() => settrendmanga(top)}>
                                <h3>{num++}.{top.title}</h3>
                                <img src={top.images.jpg.image_url}></img>
                            </div>

                        )
                    }) : ''}

                </div>
            </section>}
            <Footer />

        </>
    )
}
export default Trending;