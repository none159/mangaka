import React from 'react'

const Mangasearch = (props) => {
    console.log(props.data)
    return (
        <section>
            <div className='mangainfo'>
                <div className='mangapic'>
                    <img src={props.data.images.jpg.image_url} />
                </div>
                <div className='mangadetails'>
                    <h2>{props.data.title}</h2>
                    <h3>{props.data.synopsis}</h3>
                    <h3 className='genres'>Genres :</h3> {props.data.genres.map((genra) => <h4 key={genra.name}>- {genra.name}</h4>)}

                </div>
            </div>
        </section>
    )
}
export default Mangasearch;