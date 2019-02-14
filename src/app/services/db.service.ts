import { Injectable } from '@angular/core';
import { WhoPaysDatabase } from '../db/whoPays.db'
import Dexie from 'dexie';


@Injectable({
    providedIn: 'root'
})

export class DBService {
    groupsTbl;
    friendsTbl;
    themeTbl;
    logTbl;
    constructor(private db: WhoPaysDatabase) {
        this.groupsTbl = this.db.table('groups');
        this.friendsTbl = this.db.table('friends');
        this.themeTbl = this.db.table('themes');
        this.logTbl = this.db.table('logs')
    }

    addGroup(group) {
        return this.groupsTbl.add({ name: group.name, theme: group.theme })
    }

    getAllGroups() {
        return this.groupsTbl.toArray();
    }

    getGroupMembers(group_Id) {
        return this.friendsTbl.toArray().then(friends => {
            return friends.filter(friend => friend.group_id == group_Id)
        })
    }

    getEnabledMembers(groupId) {
        //return this.friendsTbl.where("group_id").equals(groupId);
        return this.friendsTbl.where({ group_id: groupId, enable: true })
    }

    addMember(group_id, name, enable = true) {
        return this.friendsTbl.add({ group_id, name, enable })
    }

    removeMember(member_id) {
        return this.friendsTbl.delete(member_id)
    }

    updateMember(member) {
        return this.friendsTbl.update(member.id, member);
    }

    getAllThemes() {
        return this.themeTbl.toArray()
    }

    getThemeByName(name) {
        return this.themeTbl.where({ name })
    }

    getDefaultTheme() {
        return this.getThemeByName('default');
    }

    deleteGroup(group_id) {
        return this.friendsTbl.where('group_id').equals(group_id).delete()
            .then(() => {
                return this.groupsTbl.delete(group_id)
            })
    }

    writeLog(group_name, result) {
        this.logTbl.add({ group_name, result, time: new Date() })
    }

    getLogsByGroup(group_name) {
        return this.logTbl.where({ group_name })
    }
}