import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gits.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
  private apikey: string = '5UZDbnCPAZJZVCh8W7KxunLHUOvCTgWU';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];

  constructor( private http:HttpClient ) {
    this.loadLocalStorage();
  }

  public get tagsHistory()  {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string):void {
    tag = tag.toLocaleLowerCase();

    if(this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void {
    const temporal = JSON.parse(localStorage.getItem('history') || '[]');

    this._tagsHistory = temporal;
  }

  public searchTag(tag:string):void {
    if (tag.trim().length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apikey)
    .set('limit', '10')
    .set('q',  tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {
      params,
    }).subscribe((res) => {
        this.gifList = res.data;
        console.log({gifs: this.gifList});
    });

    // fetch("https://api.giphy.com/v1/gifs/search?api_key=5UZDbnCPAZJZVCh8W7KxunLHUOvCTgWU&q=valorant&limit=10")
    //   .then(res => res.json())
    //   .then(data => console.log(data));

  }


}
