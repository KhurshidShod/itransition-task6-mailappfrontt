import React, { useEffect, useState } from 'react'
import axios from 'axios'

function SendedRecievedMsgs() {

    const [ allMessages, setAllMessages ] = useState([])
    const [ rerendedMesages, setRerenderMessages ] = useState(false)

    useEffect(() => {
        setTimeout( async () => {
            await axios("http://localhost:5002/api/messages")
            .then(res => {
                if(res.data.length > allMessages.length) {
                    setRerenderMessages(!rerendedMesages)
                    console.log(res.data.length + " " + allMessages.length);
                }
            })
        }, 5000);
    }, [])
    useEffect(() => {
        fetchData()
    })

    var fetchData = async () => {
        await axios("http://localhost:5002/api/messages")
        .then(res => {
            setAllMessages(res.data)
        })
      };

      function openMessage (id) {
        localStorage.setItem("displayMsgId", id)
        console.log(id);
      }

  return (
    <div>
    <div className="messages" >
        <h3>Sended messages</h3>
                <div className="sended">
                    { rerendedMesages && allMessages.map(msg => 
                    msg.sender === localStorage.getItem('name')?
                    (<div key={msg._id} className="msg_wrap" onClick={()=>openMessage(msg._id)}>
                            <p>Reciever: {msg.reciever}</p>
                            <p>Title: {msg.title}</p>
                        </div>):false)}
                </div>
                <h3>Recieved messages</h3>
                <div className="recieved" >
                    {rerendedMesages && allMessages.map(msg => 
                    msg.reciever === localStorage.getItem('name')?
                    (
                        <div key={msg._id} className="msg_wrap">
                            <p>Sender: {msg.sender}</p>
                            <p>Title: {msg.title}</p>
                        </div>
                    ):false)}
                </div>
            </div>
            <div className="displayMessages">
                <h1>Display messages</h1>
            </div>
    </div>
  )
}

export default SendedRecievedMsgs;