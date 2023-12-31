import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit{
  @Input() control:FormControl = new FormControl()
  @Input() type:string = 'text'
  @Input() placeholder:string = ''
  @Input() format = ''
  @Output() blur = new EventEmitter<void>()

  onInputBlur(){
    this.blur.emit()
  }

  constructor(){}

  ngOnInit(): void {
    
  }
}