import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Log} from '../../models/log';
import {LogService} from '../../services/log.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  log: Log;
  logTextObject: any;
  private routeSub: Subscription;

  constructor(private logService: LogService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = 0;
    this.routeSub = this.route.params.subscribe(params => {
      id = params.id;
    });
    this.logService.getById(id).subscribe(log => {
      this.log = log;
    });
  }
}
