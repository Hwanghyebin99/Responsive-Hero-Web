import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) {}//messageService property를 public으로 할당
  // Angular가 인스턴스 생성시 MessageService의 싱글턴 인스턴스를 이 프로퍼티로 전달.

  ngOnInit(): void {
  }

}
