import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { io } from "socket.io-client";
import './homepage.css';
import '../../App.css';
import Chatbox from '../.././components/chatbox/chatbox';
import ChatBubble from '../.././components/chatBubble/chatBubble';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';

function HomePage() {

    const [isChatBoxDisplayed, toggleChatBoxDisplay] = useState(false);
    const [users,SetUsers] = useState([]);
    const [username, setUsername]=useState('');
    const [messages,SetMessages]=useState([]);
    const [loggedInUser, SetLoggedInUser] = useState("adam");
    const toggleChatBox = () => {

    toggleChatBoxDisplay(!isChatBoxDisplayed);
    }

    const socket = io("http://localhost:4000/", { transports: ['websocket'] });
    
    // fetch user details ;
    const fetchUserMessages=()=>{

        axios.get('http://localhost:4000/api/messages')
            .then(function (response) {
                // handle success
                SetMessages(response.data.data.rows);

                console.log(response.data.data.rows);

            }).then(function(data){
                // SetMessages(data.data.rows);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

        
    //   fetch('http://localhost:4000/api/messages').then((res) => res.json()).then((data) => {
    //     console.log(data.data.rows);
    //      SetMessages(data.data.rows);
       
    //   }).catch(error=>console.log(error));
    //  console.log("ran")
  }
  
  const fetchUserDetails=()=>{
      
      fetch('http://localhost:4000/api/profile').then((res) => res.json()).then((data)=>{
          console.log(data.data.rows);
          
          SetUsers(data.data.rows);
        });
  }
  function setRecipientAndSender(user){

      fetch('http://localhost:4000/api/userTosendmessage', {
          method: 'POST', // or 'PUT'
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user, loggedInUser }),
      });
  }
   
  const chatWithUser=(user)=>{
     
      setUsername(user);
    
      setRecipientAndSender(user);
      toggleChatBoxDisplay(true);
      setTimeout(function(){
        fetchUserMessages();
    
      },1000)
   

  }

//   useEffect(()=>{
//       fetchUserMessages()
//   })

    useEffect(() => {
        fetchUserDetails();
    },[]);
    
    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            alignItems:'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));
    const classes = useStyles();
    return (
        <div className="home">
 
            <div className='users'>
                 
                <h1 className='users__title'>Users</h1>
                {users.map((user) => {
                    return (
                        <div onClick={() => { chatWithUser(user.username)}} className='username'>
                            <div className={classes.root}>
                                <Avatar alt={user.username} src="/static/images/avatar/1.jpg" />
                                <p>{user.username}</p>
                            </div>

                        </div>
                    )
                })}
            </div>
        
            <div>
                {isChatBoxDisplayed ?
                    (<Chatbox messages={messages} username={username} toggleChatBoxDisplay={toggleChatBox} loggedInUser={loggedInUser}/>) : ""
                }
            </div>

            <ChatBubble  toggleChatBoxDisplay={toggleChatBox} />
        </div>
    );
}

export default HomePage;
