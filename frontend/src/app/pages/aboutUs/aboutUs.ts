import { Component, Inject } from '@angular/core';
import { About } from '../../services/about';

@Component({
  selector: 'app-aboutUs',
  imports: [],
  templateUrl: './aboutUs.html',
  styleUrl: './aboutUs.css',
  providers: [About],
})
export class AboutUs {
  teamMembers;
  constructor(@Inject(About) private about: About) {
      this.teamMembers = this.about.getTeamMembers();
}
}
