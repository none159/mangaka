import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Nav = (props) => {
    const [input, setinput] = useState('')
    const updatesearch = () => {
        props.setsearch(input)
    }
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <h2>MANGEKO</h2>
                </div>
                {props.setsearch ? <div className='searchbox'>
                    <input placeholder='search...' value={input} onChange={(e) => setinput(e.target.value)} />
                    <button onClick={updatesearch}>Search</button>
                </div> : ''}
                <div className='navigate'>
                    <Link to="/" style={{ textDecoration: 'none' }} ><h2>Home</h2></Link>
                    <Link to="/trending" style={{ textDecoration: 'none' }}><h2>Trending</h2></Link>
                    <Link to="/groupchat" style={{ textDecoration: 'none' }}><h2>GroupChat</h2></Link>
                </div>
            </div>

        </nav>
    )
}
export default Nav;