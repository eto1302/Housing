import { TestBed } from '@angular/core/testing';
import {AgentService} from "./agent-service.service";


describe('AgentServiceService', () => {
  let service: AgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
