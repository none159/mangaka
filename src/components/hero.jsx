import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import Mangasearch from './mangasearchinfo'
import Mangadata from './mangadata'
import oyasumi from '../images/ZQk3Im5.jpeg'
import berserk from '../images/pj1xbsjl5cn01.jpeg'
import vagabond from '../images/eucy1q2mjzs01.png'
const Hero = (props) => {
    const [index, setindex] = useState(0)
    const [data, setdata] = useState()
    const [mangadata, setmangadata] = useState('')
    const [displayfullinfo, setdisplayfullinfo] = useState(false)
    const [passeddata, setpasseddata] = useState('')
    const [imgs, setimgs] = useState([])
    const [genres, setgenres] = useState('')
    const [updatasearch, setupdatesearch] = useState('')
    const [genre, setgenre] = useState('')
    const [recommendation, setrecommendation] = useState('')

    const displayinfo = () => {
        data.map((data) => {
            if (data.images.jpg.image_url == imgs[index + 1]) {
                setdisplayfullinfo(true)
                setpasseddata(data)
            }
        })
    }
    const fetchimg = () => {
        let imglist = []
        axios.get('https://api.jikan.moe/v4/top/manga').then(res => {
            setdata(res.data.data)
            res.data.data.map((data) => {

                imglist.push(data.images.jpg.image_url)
                setimgs(imglist)

            })

        }).catch(err => console.log(err))


    }
    const fetchgenres = () => {
        setTimeout(() => {
            axios.get('https://api.jikan.moe/v4/genres/manga').then(res => {
                setgenres(res.data.data)

            }).catch(err => console.log(err))
        }, 5000)
    }
    const getrecommendation = (id, name) => {
        axios.get(`https://api.jikan.moe/v4/manga/${id}/recommendations`).then((res) => {
            setmangadata(res.data.data)
            setdisplayfullinfo(true)
            setgenre(name)
        }).catch(err => console.log(err))
    }
    const personalrec = (search) => {
        props.setsearch(search)
    }
    const inc = () => {
        let ind = 0
        setInterval(() => {
            if (ind > 3) {
                ind = 0
                setindex(ind)

            }
            else {
                ind = ind + 1
                setindex(ind)

            }
        }, 10000)
    }

    useEffect(() => {
        fetchimg()
        inc()
        fetchgenres()

    }, [])
    useEffect(() => {
        props.setsearch(updatasearch)
    }, [updatasearch])
    return (
        <section>
            {!displayfullinfo ? <div className='hero-container'>
                <div className='slider'>
                    <div className='left-img'>
                        <img src={imgs[index]}></img>
                    </div>
                    <div className='mid-img'>
                        <img onClick={displayinfo} src={imgs[index + 1]}></img>
                    </div>
                    <div className='right-img'>
                        <img src={imgs[index + 2]}></img>
                    </div>
                </div>
                <div className='categoriesbox'>
                    <h2>Categories</h2>
                    <div className='categories'>

                        {genres != '' ? genres.map((genres) => <h3 className='' key={genres.name} onClick={() => getrecommendation(genres.mal_id, genres.name)}> {genres.name}</h3>) : <h2 style={{ color: "rgb(234, 143, 24)", position: "relative", boxShadow: "none", left: "25%", fontFamily: "sans-serif", fontWeight: "300" }}>Loading...</h2>}

                    </div>
                </div>
                <div className='recommendations'>
                    <h2>Personal Recommendations :</h2>
                    <div>
                        <h3>Oyasumi PunPun</h3>
                        <img onClick={() => personalrec("oyasumi punpun")} src={oyasumi} />
                    </div>
                    <div>
                        <h3>Berserk</h3>
                        <img onClick={() => personalrec("berserk")} src={berserk} />
                    </div>
                    <div>
                        <h3>Vagabond</h3>
                        <img onClick={() => personalrec("vagabond")} src={vagabond} />
                    </div>
                </div>
            </div> : mangadata.length != '' ? <Mangadata data={mangadata} search={setupdatesearch} genre={genre} /> : <Mangasearch data={passeddata} />}
        </section>
    )
}
export default Hero
/* add link to genra and fetch data from manga data component. */