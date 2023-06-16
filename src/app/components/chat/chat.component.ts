import { Component } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  myhub! : signalR.HubConnection
  messages : string[] = []

  message! : string
  user! : string

  ngOnInit() {
    this.myhub = new signalR.HubConnectionBuilder()
                 .withUrl("https://localhost:7275/chathub").build()

    this.myhub.on("newMessage", (user, message) => {
      console.log("test " +message)
      this.messages.push(user + " : " + message)
    })

    this.myhub.start()
  }

  joinGroup(){
    this.myhub.on("fromGroupkaamelott",  (user, message) => {
      this.messages.push(user + " : " + message)
    })

    this.myhub.send("JoinGroup", "kaamelott")

  }

  sendToGroup() {
    this.myhub.send("SendToGroup", "kaamelott", this.user, this.message)
  }

  send() {
    console.log("test")
    this.myhub.send("SendMessage", this.user, this.message)
  }
}
