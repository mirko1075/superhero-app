import { convertToParamMap, ParamMap } from '@angular/router';
import { ReplaySubject } from 'rxjs';

// Mock or Stub implementation of ActivatedRoute
export class ActivatedRouteStub {
  private subject: ReplaySubject<ParamMap>;

  constructor() {
    this.subject = new ReplaySubject<ParamMap>(1);
  }

  // Set the paramMap with a new value
  setParamMap(params: any) {
    const paramMap = convertToParamMap(params);
    this.subject.next(paramMap);
  }

  // Access the paramMap as an observable
  get paramMap() {
    return this.subject.asObservable();
  }
}
