import { Injectable } from '@angular/core';
import Dexie from 'dexie'

@Injectable({
    providedIn: 'root'
})
export class WhoPaysDatabase extends Dexie {
    constructor() {
        super("whoPaysDB");
        this.version(1).stores({
            groups: `++id`,
            friends: `++id, group_id, enable`,
            themes: '++id, name',
            logs: `++id, group_name`
        });

        this.on("populate", () => {
            //themes
            this['themes'].bulkAdd(
                [{
                    name: 'default', colors: ["#FFDE1A", "#00AEEF", "#F26426", "#EC018C", "#ED1C24", "#991008", "#0247fe", "#202530", "#66b132", "#d0e92b", "#814926", "#595457", "#37180A", "#CCB999", "#dac9b7", "#f9bc02", "#fb9902", "#fd5308", "#fe2712", "#a7194b", "#8601b0", "#0392ce", "#fffe32", "#553826", "#eef1f1"]
                }, {
                    name: 'sunrise', colors: ["#F8D369", "#F9BF23", "#D2C2A2", "#EDB044", "#F29E1A", "#CEA88B", "#B3AA9F", "#D99959", "#EA9130", "#C98D70", "#DA813D", "#ED731B", "#AD8F83", "#639CB9", "#9191A3", "#C17A57", "#5089B4", "#CC6238", "#D8581F", "#8B6D6E", "#A6604B", "#AE4723", "#745751", "#445A86", "#773F2E", "#534248", "#263557", "#401C16", "#14141D", "#11100E", "#11100D", "#0F0A0A"]
                }, {
                    name: 'parrot', colors: ["#829316", "#037616", "#177F58", "#0A4097", "#F61C0A", "#36341B", "#3186BA", "#067693", "#000001", "#57C1F5", "#DCB107", "#B4920C", "#388130", "#C40904", "#F51906", "#0367D2", "#07192F", "#0C0606", "#F76922", "#765723", "#0748BA", "#0266CB", "#027DEB", "#427978", "#08A8E9", "#0E3661", "#770803", "#FBC405", "#077319"]
                }]);

            //Default Group
            this['groups'].add({ name: 'What to do today?', theme: 'default' })

            //Good Day items
            this['friends'].bulkAdd([
                { group_id: 1, name: "Party", enable: true },
                { group_id: 1, name: "Go for a ride", enable: true },
                { group_id: 1, name: "Meet new person", enable: true },
                { group_id: 1, name: "Make a smile", enable: true },
                { group_id: 1, name: "Take a break", enable: true },
                { group_id: 1, name: "Have fun", enable: true },
                { group_id: 1, name: "Read a book", enable: true },
                { group_id: 1, name: "Selfie with frnd", enable: true },
                { group_id: 1, name: "Walk on a grass", enable: true },
                { group_id: 1, name: "Call a friend", enable: true },
            ])
        })
    }
}