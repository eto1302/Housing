import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  agents = [
    {
      name: 'Силвия Гочева'
    },
    {
      name: 'Agent 1'
    },
    {
      name: 'Agent 2'
    }
  ];

  constructor() {
  }
}
