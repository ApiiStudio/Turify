import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class About {

  constructor() { }

  teamMembers = [
    { id: 1, name: "Benicio Ferrer", role: "Scrum Master", image: "/imagenes/team/1.jpeg" },
    { id: 2, name: "Ezequiel Rey", role: "Developer", image: "/imagenes/team/1.jpeg" },
    { id: 3, name: "Vicente Sanchez", role: "Developer", image: "imagenes/team/1.jpeg" },
    { id: 4, name: "Yaco Ledesma", role: "Developer", image: "imagenes/team/1.jpeg" }
  ];

  getTeamMembers() {
    return this.teamMembers;
  }
  
}