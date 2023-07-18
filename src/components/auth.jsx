import { useState } from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import Cookie from 'universal-cookie'

const cookie = new Cookie();



export const Auth = (props) => {
    const signin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookie.set('authentication', result.user.refreshToken);
            props.setisAuth(true);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className='signin'>
            <h2>Your Not Signed In.</h2>
            <button onClick={signin}>Click To Sign In</button>
        </div>
    )
}
export default Auth;