import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AgentService} from '../../services/agent-service.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements  OnInit{
  private routeSub: Subscription;
  private id = 0;
  agent;
  constructor(private route: ActivatedRoute, private agentService: AgentService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params.id;
    });
    this.agent = this.agentService.agents[this.id - 1];
  }
}
