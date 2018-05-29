import {observable, autorun} from 'mobx';

export class UserStore {
  @observable username
  @observable users = []

  constructor(webSocketService) {
    this.webSocketService = webSocketService

    this.webSocketService.onopen = () => {
      this.webSocketService.send(JSON.stringify({
        type: 'ADD_USER',
        name: username
      }))
    }

    this.webSocketService.onmessage = (event) => {
      const data = JSON.parse(event.data)
      switch (data.type) {
        case types.ADD_USER:
          this.addUser(username)
          break
        case types.USERS_LIST:
          this.getUsersList()
          break
        default:
          break
      }
    }
  }

  @computed addUser(){

  }

  @computed getUsersList() {

  }
}