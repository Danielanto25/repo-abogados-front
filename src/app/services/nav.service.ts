import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  @Output()
  navAdmin: EventEmitter<boolean> = new EventEmitter;

  @Output()
  navLogin: EventEmitter<boolean> = new EventEmitter;

  constructor() { }
}
