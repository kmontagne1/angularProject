import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  imports: [],
  templateUrl: './pony.component.html',
  styleUrl: './pony.component.css'
})
export class PonyComponent  {
  @Input() ponyModel: PonyModel;
  @Input() isRunning : boolean;
  @Output() ponyClicked = new EventEmitter<PonyModel>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  

  getPonyImageUrl() {
    if (this.isRunning){
      return `assets/images/pony-${this.ponyModel.color.toLowerCase()}-running.gif`
    }
    else{
      return `assets/images/pony-${this.ponyModel.color.toLowerCase()}.gif`
    }
  }

  clicked() {
    this.ponyClicked.emit(this.ponyModel);
  }

}
