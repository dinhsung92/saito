import {observable, autorun} from 'mobx';

export class ChatStore {
  // @observable sessions = []
  @observable messages = []

  constructor(webSocketService) {
    this.webSocketService = webSocketService

    this.webSocketService.onmessage = (event) => {
      const data = JSON.parse(event.data)
      switch (data.type) {
        case 'ADD_MESSAGE':
          //this.sendMessage(data.session_id, data.message)
          this.addMessage(data.session_id, data.author_id, data.message)
          break
        default:
          break
      }
    }
  }

  @computed sendMessage(session_id, author_id, message){
    // this.webSocketService.on("message", )
    this.webSocketService.send({type: 'ADD_MESSAGE', author_id, message})
    this.addMessage(author_id, message)
  }

  @computed addMessage(author_id, message){
    this.messages.push({author_id, message})
  }

  @computed getMessages() {
    return
  }

  // @computed createSession() {

  // }
}