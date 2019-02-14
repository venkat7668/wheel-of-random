import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { WheelComponent } from '../app/components/wheel/wheel.component';
import { DBService } from '../app/services/db.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'Who Pays...?';
  @ViewChild('wheel')
  wheelCompRef: WheelComponent;

  isSpinning = false;

  names = ["Shreyan", "Harshit", "Goldy", "Soumya", "Gowthami", "Rasana", "Sowjanya", "Rajini", "Ram", "Venkat", "Vijay", "Ganesh", "Prakash"];

  constructor(private db: DBService) {
    // console.log(window['TweenMax']);
  }

  wheelStopHandler(resultObj) {
    console.log(`Segment: ${resultObj.index}, Name: ${resultObj.name}`)
    this.isSpinning = false;
  }

  spinHandler(){
    this.wheelCompRef.spin();
    this.isSpinning = true;
  }

  ngOnInit() {
    this.db.getDefaultTheme().toArray().then(data => {
      //console.log(data);
    })
  }
}
