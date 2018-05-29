const express = require('express');
const path = require('path');
//const WebSocket = require('ws')

var saito = require('../../../saito');
var ModTemplate = require('../../template');
var util = require('util');

//////////////////
// CONSTRUCTOR  //
//////////////////
function PWAChatApp(app) {

  if (!(this instanceof PWAChatApp)) { return new PWAChatApp(app); }

  PWAChatApp.super_.call(this);

  this.app                = app;
  // this.wss                = new WebSocket.Server({ port: 8989 })

  this.name               = "PWAChatApp";
  this.browser_active     = 0;
  this.handlesPWAChatApp    = 1;
  this.PWAChatAppAppName    = "PWAChatApp";

  return this;

}
module.exports = PWAChatApp;
util.inherits(PWAChatApp, ModTemplate);




PWAChatApp.prototype.initialize = function initialize(app) {

  if (app.BROWSER == 0) { return; }



  // remove us if mobile client is running
  if ($('#PWAChatApp_browser_active').length == 0) {
    for (var t = app.modules.mods.length-1; t >= 0; t--) {
      if (app.modules.mods[t].name == "PWAChatAppMobile") {
        app.modules.mods.splice(t, 1);
      }
    }
  }

}


/////////////////////////
// Handle Web Requests //
/////////////////////////
PWAChatApp.prototype.webServer = function webServer(app, expressapp) {
  expressapp.use(express.static(path.join(__dirname, 'build')));

  expressapp.get('/chat-app', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  // expressapp.get('/static/css/main.ffe9afb0.css', function (req, res) {
  //   res.sendFile(__dirname + '/build/static/css/main.ffe9afb0.css');
  //   return;
  // });

  // expressapp.get('/static/js/main.608f54ec.js', function (req, res) {
  //   res.sendFile(__dirname + '/build/static/js/main.608f54ec.js');
  //   return;
  // });

  // expressapp.get('/service-worker.js', function (req,res){
  //   res.sendFile(__dirname + '/build/service-worker.js');
  //   return;
  // })

}

// PWAChatApp.prototype.addSocketEvents = function addSocketEvents() {
//   const broadcast = function (data, ws) {
//     this.wss.clients.forEach((client) => {
//        if (client.readyState === WebSocket.OPEN && client !== ws) {
//           client.send(JSON.stringify(data))
//        }
//     })
//  }

//  this.wss.on('connection', (ws) => {
//     let index
//     ws.on('message', (message) => {
//       const data = JSON.parse(message)
//       switch (data.type) {
//         case 'ADD_USER': {
//           index = users.length
//           users.push({ name: data.name, id: index + 1 })
//           ws.send(JSON.stringify({
//             type: 'USERS_LIST',
//             users
//           }))
//           broadcast({
//             type: 'USERS_LIST',
//             users
//           }, ws)
//           break
//         }
//         case 'ADD_MESSAGE':
//           broadcast({
//             type: 'ADD_MESSAGE',
//             message: data.message,
//             author: data.author
//           }, ws)
//           break
//         default:
//           break
//       }
//     })

//     ws.on('close', () => {
//       users.splice(index, 1)
//       broadcast({
//         type: 'USERS_LIST',
//         users
//       }, ws)
//     })
//   })
// }

PWAChatApp.prototype.attachEvents = function attachEvents(app) {

}

PWAChatApp.prototype.initializeHTML = function initialize(app) {

  var chat_self = this;

  // update wallet balance
  // this.updateBalance(app);

  // tell the browser what our public/private keys look like
  // $('#lightbox_viewkeys_publickey').html(app.wallet.returnPublicKey());
  // $('#lightbox_viewkeys_privatekey').html(app.wallet.returnPrivateKey());

  // 1. Who do I want to talk to
  // Find Users that I know about
  // var chat_sessions = this.app.keys.returnKeysByTag("Chat");

  // save information to the options locally

  // once you have your keys, you want to add them as peers

  var publicKey = app.wallet.returnPublicKey()
  var privateKey = app.wallet.returnPrivateKey()

  // saito.wallet.createUnsignedTransaction(to_pubkey)

  // Core Functions to utilize
  // findKeyByTag
  // TODO: findKeysByTags
  // find vs return, any difference??

  // encrypt, facebook, reddit, remix
  // returnWatchedPublicKeys
  // saito.keys.addKey
  // Saving important key data to options
  // host and port saved in key data?
  // Once you have determined your keys, add them as peers

  // 1. Who do i want to talk to --> Facebook example
  // 2. Add Peers from keys
  // 3. Generate Shared Secret
  // 4. How do I let my peers know --> host and port in keys

  // Chat rooms, specify are you server??
  // Edit Key class to contain host and port (optional)
  // --> Broadcast message to inform change of IP

  // On itiliazation, make a local copy of the keys you want to manage

  // 5. How to send chat message
  // --> wallet --> createUnsignedTransaction(fee=0.0)
  // --> peer --> handlePeerRequest
  // things are not encrypted unless the module does it
  // Peer protocol will be defined in the module --> message.reqeust

  // Chain functionality can handle certain use cases
  // --> Persistence
  // --> Broadcast
  // Both exist if the module can't directly connect to the peer

  // fetch data from app
  // var tmptx = new saito.transaction();
  //     tmptx.transaction.id          = 0;
  //     tmptx.transaction.ts          = new Date().getTime();
  //     tmptx.transaction.from        = [];
  //     tmptx.transaction.from[0]     = {};
  //     tmptx.transaction.from[0].add = "bearguy@saito";
  //     tmptx.transaction.msg         = {};
  //     tmptx.transaction.msg.module  = "Chat";
  //     tmptx.transaction.msg.title   = "Welcome to the Saito Network (click here)";
  //     tmptx.transaction.msg.markdown = 0;
  //     tmptx.transaction.msg.message    = 'Welcome to Saito Chat! This is a decentralized chat system';
  // tmptx.decrypted_msg = tmptx.transaction.msg;
  // chat_self.addMessageToInbox(tmptx, app);


  // Run on the client, not on the server
  // msg = {};
  // msg.id     = "0";
  // msg.time   = new Date().getTime();
  // msg.from   = "david@saito";
  // msg.module = "Chat";
  // msg.title  = "Welcome to Saito Chat!";
  // msg.data   = "Greetings from the Saito team, Welcome to Saito chat! Feel free to try it out and message peers in which you have keys for";
  // this.attachMessage(msg, app, 1);
  // app.wallet.createUnsignedTransactionWithDefaultFee(to, amount)


  // load archived messages
  app.archives.processTransactions(20, function (err, txarray) {
    for (var bv = 0; bv < txarray.length; bv++) {
      try {
        if (txarray[bv].transaction.msg.module == "Chat") { //|| txarray[bv].transaction.msg.module == "Encrypt") {
          chat_self.addMessageToSession(txarray[bv], app);
        }
      } catch (err) {
        console.log("ERRR: ");
        console.log(err);
      }
    }
  });

}

PWAChatApp.prototype.handlePeerRequest = function handlePeerRequest(app, message, peer, mycallback) {
  if (message.request === "chat send message") {
    // AD MESSAGE TO CHAT
  }
}

PWAChatApp.prototype.isPublicKey = function isPublicKey(publickey) {
  if (publickey.length == 44 || publickey.length == 45) {
    if (publickey.indexOf("@") > 0) {} else {
      return 1;
    }
  }
  return 0;
}