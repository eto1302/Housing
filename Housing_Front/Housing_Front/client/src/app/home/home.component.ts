import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {Observable} from 'rxjs';
import {Property} from '../../models/property';
import {AgentService} from '../../services/agent-service.service';
import {Agent} from '../../models/agent';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public properties: Observable<Property[]>;
  agents: Agent[];

  constructor(private propertyService: PropertyService, private sanitizer: DomSanitizer, private agentService: AgentService) {}

  ngOnInit() {
    this.properties = this.propertyService.getInRange(1, 4, null);
    this.agents = this.agentService.agents;
  }

  getPath(photo: string): SafeResourceUrl {
    const imageUrl = 'data:image/jpg;base64,' + photo;
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }
}
