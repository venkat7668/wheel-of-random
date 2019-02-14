import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { TweenMax, Power2 } from 'gsap';
import { CommonService } from '../../services/common.service'
import { DBService } from '../../services/db.service';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {
  @ViewChild('wheel')
  wheelRef: ElementRef;

  @Input()
  names = [];
  @Input()
  colors = [];

  @Output()
  onwheelstop: EventEmitter<any> = new EventEmitter();

  totalSegments = 12;
  spinDuration = .9;
  repeat = 10;

  isSpinning = false;

  groupName = "Default";


  constructor(private commonService: CommonService, private db: DBService) {

    this.commonService.updateWheelValues.subscribe(group => {
      //console.log(group)
      if (group['members'].length < 2) {
        alert("Group should has atleat 2 members active!")
        return;
      }
      if (this.isSpinning) {
        return;
      }
      this.names = group['members'];
      this.groupName = group['groupName']
      //might each group has different color theme
      this.colors = group['theme'].colors;
      this.totalSegments = this.names.length;
      this.createCircle(55, 55, 50, this.names.length)
    })
  }

  ngOnInit() {
    this.totalSegments = this.names.length;

    //get default color theme and 
    this.db.getDefaultTheme().toArray().then(theme => {
      return theme[0].colors
    }).then((colors) => {
      this.colors = colors;
      this.createCircle(55, 55, 50, this.names.length)
    });
  }

  spin(el: ElementRef = this.wheelRef.nativeElement): void {
    this.isSpinning = true;
    const segment = this.randomSegment(this.totalSegments); // pick one random segment [0 to 11]
    const landingAngle = this.calcAngle(segment);
    const angle = (360 * this.repeat) + 360 - landingAngle;
    const duration = ((this.spinDuration / 360) * angle) + this.spinDuration;

    TweenMax.to(el, duration, { rotation: angle, transformOrigin: 'center center', ease: Power2.easeOut, onComplete: this.spinComplete, callbackScope: this, onCompleteParams: [segment] })
  }


  randomSegment(totalSegments: number): number {
    return Math.floor(Math.random() * totalSegments)
  }

  spinComplete() {
    //console.log(`segment`, arguments[0]);
    this.onwheelstop.emit({ index: arguments[0], name: this.names[arguments[0]] })
    this.wheelRef.nativeElement._gsTransform.rotation = 0;
    this.isSpinning = false;

    //write a log in db
    this.db.writeLog(this.groupName, this.names[arguments[0]])
  };

  calcAngle(segmentPosition: number): number {
    let oneSegmentAngle = 360 / this.totalSegments;
    return (oneSegmentAngle * segmentPosition) + oneSegmentAngle / 2;
  }


  createCircle(cx, cy, r, slices) {
    let fromAngle, toAngle,
      fromCoordX, fromCoordY,
      toCoordX, toCoordY,
      path, d, g, svgText, textNode,

      titleDist = 15;
      this.wheelRef.nativeElement.innerHTML='<style _ngcontent-c2=""> .text { font: bold 4px Arial; fill: rgb(255, 255, 255); } </style>';

    for (var i = 0; i < slices; i++) {
      path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textNode = document.createTextNode(this.names[i]);

      svgText.setAttributeNS(null, "font-size", 5);
      svgText.setAttributeNS(null, 'class', 'text');

      svgText.appendChild(textNode);

      fromAngle = i * 360 / slices;
      toAngle = (i + 1) * 360 / slices;

      fromCoordX = cx + (r * Math.cos(fromAngle * Math.PI / 180));
      fromCoordY = cy + (r * Math.sin(fromAngle * Math.PI / 180));
      toCoordX = cx + (r * Math.cos(toAngle * Math.PI / 180));
      toCoordY = cy + (r * Math.sin(toAngle * Math.PI / 180));

      d = 'M' + cx + ',' + cy + ' L' + fromCoordX + ',' + fromCoordY + ' A' + r + ',' + r + ' 0 0,1 ' + toCoordX + ',' + toCoordY + 'z';
      path.setAttributeNS(null, "d", d);
      path.setAttributeNS(null, 'fill', this.colors[i]);

      fromCoordX = cx + (titleDist * Math.cos((fromAngle + (360 / slices) / 2) * Math.PI / 180));
      fromCoordY = cy + (titleDist * Math.sin((fromAngle + (360 / slices) / 2) * Math.PI / 180));

      svgText.setAttributeNS(null, "style", "transform:translate(" + (fromCoordX) + "px," + (fromCoordY) + "px) rotate(" + ((i * (360 / slices)) + (360 / slices) / 2) + "deg)")

      this.wheelRef.nativeElement.appendChild(path);
      this.wheelRef.nativeElement.appendChild(svgText);
    }
  }

}

