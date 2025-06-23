import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class About {

  constructor() { }
  // Miembros del equipo (HardCoding)
  teamMembers = [
    { id: 1, name: "Benicio Ferrer", role: "Backend Developer", image: "/imagenes/team/beni.jpg", instagram: "" },
    { id: 2, name: "Ezequiel Rey", role: "Documentation", image: "/imagenes/team/eze.jpg", instagram: ""},
    { id: 3, name: "Vicente Sanchez", role: "Frontend Developer", image: "imagenes/team/vicen.jpg", instagram: "" },
    { id: 4, name: "Yaco Ledesma", role: "Scrum Master", image: "imagenes/team/yaco.jpeg", instagram: "" }
  ];
  // Envía Miembros
  getTeamMembers() {
    return this.teamMembers;
  }
  
}