import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NewColumnData } from '../models/models';

@Injectable()
export class SharedService {
  private newColumnSubject = new Subject<NewColumnData>();

  newColumn$ = this.newColumnSubject.asObservable();

  emitNewColumn(newColumnData: NewColumnData) {
    this.newColumnSubject.next(newColumnData);
  }
}
