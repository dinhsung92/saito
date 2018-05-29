import { onBecomeObserved, onBecomeUnobserved } from 'mobx'
import { observable, decorate } from "mobx";

class AutoObservable {
  data

  constructor(onObserved=()=>{}, onUnobserved=()=>{}) {
    onBecomeObserved(this, 'data', onObserved)
    onBecomeUnobserved(this, 'data', onUnobserved)
  }
}
decorate(AutoObservable, {
  data: observable
})

var autoObservable
var socket

const openStream = () => {
  socket = new Websocket("ws://localhost:8080")
  socket.on("message", message => { autoObservable.data = message })
}
const closeStream = () => { socket.close() }

autoObservable = new AutoObservable(openStream, closeStream);