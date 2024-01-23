//imports
import {Chats} from './chat.js'
import {ChatUI} from './ui.js'

//DOM quires
const chatInp = document.querySelector('.sendForm')
const rooms = document.querySelectorAll('.room')
const chatList = document.querySelector('.chat-body')
const usersList = document.querySelectorAll('.user')
const heading = document.querySelector('.headText')


//local storage setup 
localStorage.setItem('username','shanaka')
const username = localStorage.getItem('username');

//instences
const newChat = new Chats(username,"general")
const uiIns = new ChatUI(chatList,username)

//sending New Chats




chatInp.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg = chatInp.msg.value;
    console.log('msg')
    newChat.addChats(msg).then((res)=>{
        chatInp.reset()
    })
})

const updateChats = (member)=>{
    newChat.getchats( member,(snap)=>{

        uiIns.render(snap);
     
    });
}

updateChats()

rooms.forEach((room)=>{
    room.addEventListener('click',(e)=>{
        e.preventDefault();
        const roomName = room.value;
        newChat.updateRoom(roomName)
        heading.innerText=roomName
        updateChats()
    })
    
})

usersList.forEach((user)=>{
    
    user.addEventListener('click',(e)=>{
        e.preventDefault();
        const memberName = user.innerText.toLowerCase();
        updateChats(memberName)
    })

})


