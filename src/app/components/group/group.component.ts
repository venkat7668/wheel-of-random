import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DBService } from '../../services/db.service'
import { CommonService } from '../../services/common.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

/* 
TODO: 
1. Change theme for group
*/

@Component({
  selector: '[app-group]',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  newMemberElRef: FormControl = new FormControl("newMember");
  @Input()
  groupData;
  @Input()
  groupIndex;

  @ViewChild('memberEl')
  memberEl: ElementRef

  themeName;
  newMemberName = "";

  members = [];
  themeColors: [];

  isMemberAdding = false;
  isEdit = false;

  constructor(private db: DBService, private commonService: CommonService) {
    /*
    this.formGroup = new FormGroup({
      newMemberName: new FormControl(this.newMemberName, 
        [Validators.required, Validators.maxLength(14), Validators.minLength(4)])
    })
    */
  }

  ngOnInit() {
    this.themeName = this.groupData.theme;

    this.db.getGroupMembers(this.groupData.id).then(groupMembers => {
      this.members = groupMembers;
    })

    this.db.getThemeByName(this.themeName).toArray().then(theme => {
      this.themeColors = theme[0]
    })
  }

  addMember() {
    this.isMemberAdding = true;
    // console.log(this.memberEl);
    setTimeout(() => this.memberEl.nativeElement.focus(), 0);
  }

  addMemeberCancle() {
    this.isMemberAdding = false;
  }

  checkboxChanged(member) {
    this.db.updateMember(member).then((data) => {
      // console.log("member updated");
    })
  }

  get isMangeGroupEnabled() {
    return !this.members.length
  }

  get isUpdateWhellEnabled() {
    return this.members.length < 2
  }

  getEnabledMembersFromGroup() {
    let tempArr = [];
    this.db.getEnabledMembers(this.groupData.id).each(el => {
      return tempArr.push(el.name)
    }).then(el => {
      this.commonService.updateWheelValues.next({ members: tempArr, theme: this.themeColors, groupName:this.groupData.name });
    })
  }

  manageGroup() {
    this.isEdit = true;
  }

  manageGroupCancle() {
    this.isEdit = false;
  }

  deteleMember(member, index) {
    this.db.removeMember(member.id).then(col => {
      this.members.splice(index, 1);
    });
  }

  updateMember(member) {
    this.db.updateMember(member).then(done => {
      console.log(done);
    })
  }

  saveMember() {

    this.db.addMember(this.groupData.id, this.newMemberName).then(() => {
      return this.db.getGroupMembers(this.groupData.id)
    }).then(groupMembers => {
      this.members = groupMembers;
      this.newMemberName = "";
      this.isMemberAdding = false;
    });

  }

  deleteGroup(group_id) {
    this.db.deleteGroup(group_id).then(done => {
      console.log(done);
      this.commonService.groupDeleted.next(this.groupIndex);
    })
  }
}
