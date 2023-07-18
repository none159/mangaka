import { useState, useEffect, useRef } from 'react'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import InputEmoji from 'react-input-emoji'
import "./chatbotcss.css"

const Chat = (props) => {
    const [newMessage, setnewMessage] = useState();
    const [oldMessages, setoldMessages] = useState();
    const [msgsnum, setmsgnum] = useState(0)
    const [docsid, setdocsid] = useState('')
    const [data, setdata] = useState('')
    const messagesref = collection(db, "messages");
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (newMessage === '') {
            return;
        }
        await addDoc(messagesref, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: props.room


        })


        setnewMessage('');
        setmsgnum(msgsnum + 1)
        if (msgsnum > 10) {
            props.DisplayError(true)


            docsid.map((docid) => {


                deleteDoc(doc(db, "messages", docid))


            }
            )
            setmsgnum(0)
            setoldMessages('')
            props.setroom(null)
        }

    }

    function handleOnEnter(text) {
        console.log('enter', text)
    }
    useEffect(() => {
        const ids = []
        const queryM = query(messagesref, where("room", "==", props.room), orderBy("createdAt"));
        onSnapshot(queryM, (snapshot) => {
            let oldmessages = [];
            snapshot.forEach((doc) => {
                oldmessages.push({ ...doc.data(), id: doc.id });
                ids.push(doc.id)
                setdocsid(ids);
                setdata(doc.data());

            })
            setoldMessages(oldmessages);

        });
    }, [])

    return (
        <div className='chatsection'>
            <h2>Room : {props.room}</h2>
            <div className='messagesbox'>

                {oldMessages ? oldMessages.map((messages) => {
                    return (<div className='messages'>
                        {messages.createdAt ?

                            <>

                                <h3>{messages.user} :</h3>
                                <h2>{messages.text}</h2>
                                <h4>{messages.createdAt.toDate() + ''}</h4>

                            </> : ''}

                    </div>)
                }) : ''}
            </div>
            <div className='sendbox'>
                <form onSubmit={handlesubmit}>
                    <input value={newMessage} onChange={(e) => setnewMessage(e.target.value)}></input>
                    <InputEmoji
                        value={newMessage}
                        onChange={setnewMessage}
                        cleanOnEnter
                        onEnter={handleOnEnter}
                        placeholder="Type a message"
                    />
                    <button type="submit" >Send Message</button>
                </form>
            </div>
        </div>
    )
}
export default Chat;