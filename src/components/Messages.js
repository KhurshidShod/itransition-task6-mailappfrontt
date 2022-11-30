import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './messages.css'
import { Multiselect } from "multiselect-react-dropdown"
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import SendedRecievedMsgs from './SendedRecievedMsgs'


function Messages() {
    var datas = [
    ]
    const [ allMessages, setAllMessages ] = useState([])
    const [ rerendedMesages, setRerenderMessages ] = useState(false)
    const [ displayMsg, setDisplayMsg ] = useState({
        displayMsgTitle: '',
        displayMsgMessage: '',
        displayMsgSender: '',
        displayMsgReciever: ''
    })
    const [ enteredUsers, setEnteredUsers ] = useState([])
    const [ fullMsg, setFullMsg ] = useState({})
    const [ inputs, setInputs ] = useState({
        sender: localStorage.getItem('name'),
        reciever: "",
        title: "",
        message: ""
    })
    var fetchData = async () => {
        await axios("https://itransition-task6-mailapp.up.railway.app/api/messages")
        .then(res => {
            setAllMessages(res.data)
        })
      };
    var loadUsers = async () => {
        const response = await axios.get('https://test-4ae1d-default-rtdb.firebaseio.com/users.json');
        Object.keys(response.data).forEach((user) => {
            enteredUsers.push(
                {name: response.data[user].name}
            )
        })
        console.log(enteredUsers)
        for(let i = 0; i<enteredUsers.length; i++) {
            for(let j = i+1; j<enteredUsers.length; j++) {
                if(enteredUsers[i].name === enteredUsers[j].name){
                    enteredUsers.splice(i, 1)
                }
            }
        }
        
    }
      useEffect(() => {
        setTimeout(() => {
            fetchData();
        }, 5000);
      }, []);
      useEffect(() => {
        setTimeout(() => {
            loadUsers();
        }, 5000);
      }, [])

    const changeHandlerReciever = (event) => {
        localStorage.setItem('reciever', event[0].name)
    }

    const changeHandler = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const sendRequest = async () => {
        const res = await axios.post('https://itransition-task6-mailapp.up.railway.app/api/messages', {
            reciever: localStorage.getItem('reciever'),
            sender: localStorage.getItem('name'),
            title: inputs.title,
            message: inputs.message
        }).catch(err => console.log(err))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest()
    }
    const displayFullMsg = (senderOrRecieve) => {
        console.log(senderOrRecieve);
    }
    useEffect(() => {
        setTimeout( async () => {
            await axios("https://itransition-task6-mailapp.up.railway.app/api/messages")
            .then(res => {
                if(res.data.length > allMessages.length) {
                    setRerenderMessages(!rerendedMesages)
                }
            })
        }, 5000);
    }, [])
    useEffect(() => {
        fetchData()
    })

    var fetchData = async () => {
        await axios("https://itransition-task6-mailapp.up.railway.app/api/messages")
        .then(res => {
            setAllMessages(res.data)
        })
      };

      function openMessage (id) {
        localStorage.setItem("displayMsgId", id)
        allMessages.map(allmsg => {
            console.log(allmsg._id)
            console.log("Sender: "+allmsg.sender + "Reciever: "+allmsg.reciever+"Title: "+allmsg.title+"Message: "+allmsg.message);
            if(allmsg._id === localStorage.getItem('displayMsgId')){
                displayMsg.displayMsgTitle = allmsg.title
                displayMsg.displayMsgMessage = allmsg.message
                displayMsg.displayMsgSender = allmsg.sender
                displayMsg.displayMsgReciever = allmsg.reciever
                console.log(displayMsg)
            }
        })
        console.log(id);
      }

  return (
    <div>
        <div className="container">
            <div className="messages" >
        <h3>Sended messages</h3>
                <div className="sended">
                    { rerendedMesages && allMessages.map(msg => 
                    msg.sender === localStorage.getItem('name')?
                    (
                        <div key={msg._id} className="msg_wrap" onClick={()=>openMessage(msg._id)}>
                            <p>Reciever: {msg.reciever}</p>
                            <p>Title: {msg.title}</p>
                        </div>
                    ):false)}
                </div>
                <h3>Recieved messages</h3>
                <div className="recieved" >
                    {rerendedMesages && allMessages.map(msg => 
                    msg.reciever === localStorage.getItem('name')?
                    (
                        <div key={msg._id} className="msg_wrap" onClick={()=>openMessage(msg._id)}>
                            <p>Sender: {msg.sender}</p>
                            <p>Title: {msg.title}</p>
                        </div>
                    ):false)}
                </div>
            </div>
            <div className="form_and_messages">
            <Form onSubmit={handleSubmit}>
                {/* <AsyncSelect loadOptions={loadOption} /> */}
                <Multiselect required singleSelect options={enteredUsers} displayValue='name' onSelect={changeHandlerReciever} />
                <Form.Group>
                <Form.Label htmlFor="reciever">Reciever</Form.Label>
                {/* <Form.Control type="text" name="reciever" onChange={changeHandler} value={inputs.reciever} id="reciever" /> */}
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control required type="text" name="title" id="title" onChange={changeHandler} value={inputs.title} />
                </Form.Group>
                <Form.Group>
                <Form.Label htmlFor="msg">Message</Form.Label>
                <Form.Control required as="textarea" type="text" name="message" id="msg" onChange={changeHandler} value={inputs.message} />
                </Form.Group>
                <Button variant='primary' type='submit'>Send</Button>
            </Form>
            {
                localStorage.getItem('displayMsgId') ? (
                <div className="displayMessage">
                    <div className="displayMessage_title">
                        <p><b>Title: </b>{displayMsg.displayMsgTitle}</p>
                        <p>{displayMsg.displayMsgSender} ➡️ {displayMsg.displayMsgReciever}</p>
                    </div>
                    <div className="flmsg">
                    <p>{displayMsg.displayMsgMessage}</p>
                    </div>
                </div>
                ) : (<p>No message selected</p>)}
                </div>
        </div>
    </div>
  )
}

export default Messages