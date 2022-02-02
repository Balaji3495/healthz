import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';

import { NgImageSliderModule } from 'ng-image-slider';

// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatTabsModule } from '@angular/material/tabs';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    NgImageSliderModule,
   
    // SlickCarouselModule
    MatTabsModule,
    CarouselModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports:[]
})
export class HomepageModule { }
