const WebSocket = require('ws');

export function WebSocketService {
  if ws return {ws}

  const ws = new WebSocket('ws://localhost:8989');

  return ws
}

// import { onBecomeObserved, onBecomeUnobserved } from 'mobx'
// import { observable, decorate } from "mobx";

// export class WebSocketService {
//   data

//   constructor(onObserved=this.openStream(), onUnobserved=this.closeStream()) {
//     onBecomeObserved(this, 'data', onObserved)
//     onBecomeUnobserved(this, 'data', onUnobserved)
//   }

//   openStream () {
//     socket = new Websocket("ws://localhost:8989")
//     socket.on("message", message => { this.data = message })
//   }

//   closeStream () { socket.close() }
// }

// decorate(WebSocketService, {
//   data: observable
// })