import React, { useState, useRef, useEffect } from 'react'
import Auth from './auth'
import Chat from './chat'
import Nav from "./navbar"
import Footer from "./footer"
import './chatbotcss.css'
import Cookies from 'universal-cookie'
import { query, addDoc, collection, where, onSnapshot } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase-config'
const cookie = new Cookies();

const Chatpage = () => {
    const [isAuth, setisAuth] = useState(cookie.get('authentication'));
    const [room, setroom] = useState(null)
    const [chance, setchances] = useState('')
    const [error, seterror] = useState(false)
    const roomInputRef = useRef(null);
    const chances = collection(db, "chances");
    if (!isAuth) {
        return (
            <>
                <Nav />
                <div>
                    <Auth setisAuth={setisAuth} />
                </div>
                <Footer />
            </>
        )
    }
    const signout = async () => {
        await signOut(auth);
        cookie.remove('authentication');
        setisAuth(false);
        setroom(null);
    }
    const createroom = async () => {
        seterror(false)
        setroom(roomInputRef.current.value)


    }

    return (
        <>
            <Nav />
            <section>
                <div>
                    {error ? <h2 style={{ backgroundColor: 'red', position: 'relative', top: '200px', padding: '5px', color: '#222222' }}>The Room Reached It's Capacity Recreate Another Room:</h2> : ''}
                    {room ? <Chat room={room} setroom={setroom} DisplayError={seterror} /> :
                        <div className='roombox'>
                            <h2>Create or Join Room</h2>
                            <div className='roominput'>
                                <label>Room Name :</label>
                                <input ref={roomInputRef} />
                                <button onClick={createroom}>Enter Room</button>
                            </div>

                        </div>

                    }
                </div>
                <div className='signout'>
                    <button onClick={signout}>SignOut</button>
                </div>
            </section>
            <Footer />
        </>
    )
}
export default Chatpage;