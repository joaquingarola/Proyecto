import { Component } from '@angular/core';
import { ZoneModel } from '../../models/zone-model';
import { ZoneService } from '../../services/zone/zone.service';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss']
})
export class ZonesComponent {
  public zones: ZoneModel[];
  public displayedColumns : string[] = ["id", "description", "options"];

  constructor(private categoryService: ZoneService) { }

  ngOnInit(): void {
    this.listCategories();
  }

  private listCategories(): void { 
    this.categoryService.getAll()
    .subscribe(
      (response) => {
        this.zones = response;
      });
  }
}
