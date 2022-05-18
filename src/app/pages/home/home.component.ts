import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';

import Swal from 'sweetalert2'

import  SwiperCore, { Swiper ,EffectCards, Pagination }from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

import { SwiperComponent } from "swiper/angular";


import { Item, Video } from '../../models/youtube.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, AfterViewInit {

  video : Video[] = [];

  constructor( private services: YoutubeService ) { }

  ngOnInit(){

    this.cargarVideos();

  }

  cargarVideos(){

    this.services.getVideos()
      .subscribe( (resp:any) => {

        this.video.push( ...resp )
        console.log ( this.video );
      });

  }

  ngAfterViewInit(): void{
    const swiper = new Swiper('.swiper-container', {
      slidesPerView : 5.3,
      freeMode : true,
      spaceBetween : 15
    });
  }

  mostrarVideo( video: Video ){
    console.log( this.video )
    Swal.fire({
      title: '',
      html:`
      <h4> ${ video.title } </h4>
      <hr>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/${ video.resourceId.videoId }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> `,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

}
