
import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gits.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input()
  public gif!:Gif;

  public ngOnInit(): void {
    if(!this.gif) throw new Error('Gif property is required on card.component.ts');
  }
}
