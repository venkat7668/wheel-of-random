import { Component, OnInit } from '@angular/core';
import { DBService } from '../../services/db.service';
import { CommonService } from '../../services/common.service';
import { mergeMap } from 'rxjs/operators'

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  lastSpin;
  constructor(private db: DBService, private commonService: CommonService) {


    //
    this.commonService.updateWheelValues.pipe(mergeMap(group => {
      return this.db.getLogsByGroup(group['groupName']).last()
    })).subscribe(log => {
      this.lastSpin = log;
    });
  }

  ngOnInit() {
  }

}
