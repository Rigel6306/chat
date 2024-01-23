

export class ChatUI {
    constructor(chatList,username){
        this.chatList=chatList
        this.username=username
    }

    render(data){

        let html = `  <div class="chat">
                        <span class='username'>  </span>
                        <span class='message'>  </span>
                        <div class = 'time'>   </div>
                     </div>`
        let cht_name = 'chat' 
        const dataList= []
            data.docs.forEach((datam)=>{
                 dataList.push({...datam.data()})
                
            })
            console.log(dataList)
       

            dataList.forEach((e)=>{
                e.username===this.username?cht_name='chat-me':cht_name='chat'
                html +=`
                        <div class=${cht_name}>
                            <p > <span class='msg-body-username'}>${e.username} </span> ${e.message}  </p>   
                        </div>
                        ` 
            })


            this.chatList.innerHTML=html
            this.chatList.scrollTo({
                top: this.chatList.scrollHeight,
                behavior: 'smooth'
            
              });
      

    }


}