import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mapTo } from 'rxjs';
import { YoutubeResponsive } from '../models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  // Todo estos datos fueron traidos a traves de la url de youtube https://developers.google.com/youtube/v3/docs/playlistItems/list?apix_params=%7B%22part%22%3A%5B%22snippet%22%5D%2C%22maxResults%22%3A5%2C%22pageToken%22%3A%22EAAaBlBUOkNBVQ%22%2C%22playlistId%22%3A%22UUuaPTYj15JSkETGnEseaFFg%22%7D
  // Para obtener estos datos se busco en channels y luego "list" par ahi colocar la key del playlist o canal que se desea sacar la informacion, ahi se coloca en el part "conteinerLit" y en el id la key de youtube 
  // luego en el playlistItems se obtiene el resto de los datos a sacar como el nextpage( esto es para saber cual seria la key para obtener la siguiente informacion de los siguientes videos ) y playlistId que se obtiene en el channel
  // y se imlpemento un get en el posstman haciendo llamados según

  private youtubeUrl = "https://www.googleapis.com/youtube/v3";
  private apikey = "AIzaSyADsrIjmrHOUJjunTbsLRqGUxb1dZYg3Yk";
  private playlistId = "UUuaPTYj15JSkETGnEseaFFg";
  private nextPageToken = "";
  
  constructor( private http : HttpClient ) { }

  getVideos(){
    
    const url =  `${ this.youtubeUrl }/playlistItems`;
    
    const params = new HttpParams()
                        .set( 'part','snippet' )
                        .set( 'maxResults','10' )
                        .set( 'key', this.apikey )
                        .set( 'playlistId', this.playlistId )
                        .set( 'pageToken', this.nextPageToken )

    return this.http.get<YoutubeResponsive>( url, { params } )
                .pipe(
                  map( resp => {
                    this.nextPageToken = resp.nextPageToken
                    return resp.items;
                  } ),
                  map( items => {
                    return items.map( video => video.snippet )
                  } )
                )
  }
  


}
