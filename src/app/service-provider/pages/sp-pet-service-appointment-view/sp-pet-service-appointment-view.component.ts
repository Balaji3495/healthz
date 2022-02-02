import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-sp-pet-service-appointment-view',
  templateUrl: './sp-pet-service-appointment-view.component.html',
  styleUrls: ['./sp-pet-service-appointment-view.component.css']
})
export class SpPetServiceAppointmentViewComponent implements OnInit {
  petServiceDetails: any;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,private router:Router) { }

  ngOnInit(): void {
    //console.log();
    if (this.storage.get('service_provider_appointment_view') == null || this.storage.get('service_provider_appointment_view') == undefined) {
      this.router.navigateByUrl('admin/Service_appointment');
    } else {
      this.petServiceDetails = this.storage.get('service_provider_appointment_view');
    }
  }

}

