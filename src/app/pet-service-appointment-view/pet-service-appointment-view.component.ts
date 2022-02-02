import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-pet-service-appointment-view',
  templateUrl: './pet-service-appointment-view.component.html',
  styleUrls: ['./pet-service-appointment-view.component.css']
})
export class PetServiceAppointmentViewComponent implements OnInit {
  petServiceDetails: any;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService,private router:Router) { }

  ngOnInit(): void {
    //console.log();
    if (this.storage.get('View_Service_appointment') == null || this.storage.get('View_Service_appointment') == undefined) {
      this.router.navigateByUrl('admin/Service_appointment');
    } else {
      this.petServiceDetails = this.storage.get('View_Service_appointment');
    }
  }

}
