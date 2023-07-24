import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import { Message } from 'src/app/models/Message';
import { NgToastService } from 'ng-angular-popup';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements AfterViewInit{

  public haveMessages : boolean = false;
  public todayMessages: any[] = [];
  public pastMessages: any[] = [];
  UserId : string = "";
  MessageText : string = "";
  
  @ViewChild('chatContainer') chatContainerRef !: ElementRef;
  
  constructor(
    private service : AuthService, 
    private mservice : UserService, 
    private toast : NgToastService, 
    private router : Router) { }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnInit() {
    if(this.service.IsLoggedIn())
    {
      this.UserId = this.service.GetUserId();
      this.mservice.GetAllMessages().subscribe((res) => {
        if(res)
        {
          this.haveMessages = true;
        }
        const sortedMessages = res.sort(
          (a: any, b: any) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );
  
        const today = new Date();
        sortedMessages.forEach((message : any) => {
          const messageDate = new Date(message.time);
          if (
            messageDate.getDate() === today.getDate() &&
            messageDate.getMonth() === today.getMonth() &&
            messageDate.getFullYear() === today.getFullYear()
          ) {
            this.todayMessages.push(message);
          } else {
            this.pastMessages.push(message);
          }
        });
      });
    }
    else
    {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Please login first to enter this page',
        duration: 5000
      });
      this.router.navigate(['login']);
    }
  }

  SendMessage()
  {
    if(this.MessageText)
    {
      const newMessage = {
        id : "00000000-0000-0000-0000-000000000000",
        userId : this.UserId,
        text : this.MessageText,
        createdAt : new Date()
      };
      this.mservice.SendMessage(newMessage)
      .subscribe({
        next : (res) =>
        {
          this.MessageText = "";
          console.log(res);
          window.location.reload(); // Reload the page after sending the message
        },
        error : (res) =>
        {
          console.log(res);
        }
      })
    }
    return false;
  }

  scrollToTop(): void {
    if (this.chatContainerRef) {
      const chatContainer = this.chatContainerRef.nativeElement;
      const scrollStep = Math.PI / (200 / 15); // Adjust the scroll speed here
      let count = 0;
      const scrollInterval = setInterval(() => {
        if (chatContainer.scrollTop === 0) {
          clearInterval(scrollInterval);
        } else {
          chatContainer.scrollTop = Math.max(chatContainer.scrollTop - (scrollStep * 15), 0);
        }
        count++;
        if (count >= 200) {
          clearInterval(scrollInterval);
        }
      }, 10);
    }
  }

  scrollToBottom(): void {
    if (this.chatContainerRef) {
      this.chatContainerRef.nativeElement.scrollTop = this.chatContainerRef.nativeElement.scrollHeight;
    }
  }
}
