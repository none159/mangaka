import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Mangasearch from './mangasearchinfo'
const Mangadata = (props) => {
    let num = 0
    const [mangadatas, setmangadatas] = useState('')
    const [title, settitle] = useState('')
    const fetchdata = () => {
        axios.get(`https://api.jikan.moe/v4/manga?q=${title}&limit=1`).then((res) => {
            setmangadatas(res.data.data)
        }).catch(err => console.log(err))
    }
    const gettingdata = (title) => {
        settitle(title)
        axios.get(`https://api.jikan.moe/v4/manga?q=${title}&limit=1`).then((res) => {
            setmangadatas(res.data.data)
        }).catch(err => console.log(err))

    }
    useEffect(() => {

        fetchdata()

    }, [title])
    return (
        <>
            {title == '' ?
                <section>
                    <div className='mangadata'>
                        <h2 className='title-recommendation'><span>{props.genre}</span> Mangas Recommendations :</h2>
                        {props.data.map((mangas) => {
                            return (

                                <div key={mangas.entry.title} className='mangadatalist' onClick={() => gettingdata(mangas.entry.title)}>

                                    <img src={mangas.entry.images.jpg.image_url}></img>
                                    <h2>{mangas.entry.title}</h2>
                                </div>
                            )

                        })}
                    </div>
                </section> : <section>
                    <div className='mangainfo'>
                        <div className='mangapic'>
                            <img src={mangadatas[0].images.jpg.image_url} />
                        </div>
                        <div className='mangadetails'>
                            <h2>{mangadatas[0].title}</h2>
                            <h3>{mangadatas[0].synopsis}</h3>
                            <h3 className='genres'>Genres :</h3> {mangadatas[0].genres.map((genra) => <h4 key={genra.name}>- {genra.name}</h4>)}

                        </div>
                    </div>
                </section>}
        </>
    )
}
export default Mangadata;