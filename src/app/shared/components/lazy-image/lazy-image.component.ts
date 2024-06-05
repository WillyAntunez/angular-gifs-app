import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css',
})
export class LazyImageComponent implements OnInit {

  public hasLoaded:boolean = false;

  @Input()
  public url!:string;

  @Input()
  public alt:string = '';

  ngOnInit(): void {
    if(!this.url) throw new Error('url property is required in lazyimage');
  }

  onLoad() {
      this.hasLoaded = true;
  }

}
