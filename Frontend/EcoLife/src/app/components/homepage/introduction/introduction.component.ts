import { Component } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent {
  photos = [
    { imageSrc: '../../../../assets/hp-carousel/carousel1.png', altText: 'Foto 1' },
    { imageSrc: '../../../../assets/hp-carousel/carousel2.png', altText: 'Foto 2' },
    { imageSrc: '../../../../assets/hp-carousel/carousel4.png', altText: 'Foto 4' },
    { imageSrc: '../../../../assets/hp-carousel/carousel5.png', altText: 'Foto 5' },
    { imageSrc: '../../../../assets/hp-carousel/carousel6.png', altText: 'Foto 6' },
  ];
}
