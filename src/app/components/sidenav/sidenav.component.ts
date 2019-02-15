import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DBService } from '../../services/db.service'
import { CommonService } from '../../services/common.service'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  groups = [];
  themeNames = [];
  addingGroup = false;
  newGroupName = "";
  newGroupTheme = "default";

  constructor(private db: DBService, private commonService: CommonService) {
    this.db.getAllThemes().then(themes => {
      // console.log(themes)
      return themes.forEach(theme => {
        this.themeNames.push({ name: theme.name, id: theme.id })
      })
    })

    this.commonService.groupDeleted.subscribe((index) => {
      this.groups.splice(index, 1);
    })

    this.db.getAllGroups().then(groups => {
      this.groups = groups;
    })

  }

  ngOnInit() {
    let $ = window['$'];
    $('.button-collapse').sideNav({
      menuWidth: 320,
      edge: 'left',
      closeOnClick: true
    });
  }

  getAllGroups() {
    this.db.getAllGroups().then(groups => {
      this.groups = groups;
    })
  }

  addGroup() {
    this.addingGroup = true;
  }

  addGroupCancle() {
    this.addingGroup = false;
    this.newGroupName = "";
  }

  saveGroup() {
    this.db.addGroup({ name: this.newGroupName, theme: this.newGroupTheme }).then(() => {
      return this.db.getAllGroups()
    }).then(groups => {
      this.groups = groups;
      this.newGroupName = "";
    })
    this.addingGroup = false;
  }
}
