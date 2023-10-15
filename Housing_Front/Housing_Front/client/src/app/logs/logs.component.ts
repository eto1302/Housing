import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {Observable} from "rxjs";
import {Log} from "../../models/log";

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit{

  logs: Observable<Log[]>;
  constructor(private logService: LogService){
  }

  ngOnInit(): void {
    this.logs = this.logService.findAll();
  }

}
