
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
 import { getFirestore,collection,
          serverTimestamp,addDoc, 
          onSnapshot,query, where,orderBy} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

 const firebaseConfig = {
   apiKey: "AIzaSyD2N7p5cnALK6T1oZ45BzSC0obTQrNpujk",
   authDomain: "webdev-demo-1364a.firebaseapp.com",
   projectId: "webdev-demo-1364a",
   storageBucket: "webdev-demo-1364a.appspot.com",
   messagingSenderId: "174084074822",
   appId: "1:174084074822:web:ebb03ea8ae585fd240c947"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore()
 const collRef = collection(db,"chats");

 export class Chats {
    constructor(username,room){
        this.username=username,
        this.room=room
    }

    async addChats(message){
        const chat={
           message,
           username:this.username,
           room:this.room,
           created_at:serverTimestamp()
        }
        const responce = await addDoc(collRef,chat)
        return responce
    }

    getchats( filterName,cb  ){
    
        let q =''
            
        const userList = [`${this.username}`,`${filterName}`]
        console.log(userList)
        if(filterName) q = query(collRef,where('room',"==",`${this.room}`),where("username", "in",userList), orderBy('created_at','asc'))
        else q = query(collRef,where('room',"==",`${this.room}`), orderBy('created_at','asc'))
 

        onSnapshot(q,(snapshot)=>{

            console.log(snapshot.docs)
            cb(snapshot)
      
        })
    }

    updateName(username){
        this.username=username
    }

    updateRoom(room){
        this.room=room
    }

 }








 