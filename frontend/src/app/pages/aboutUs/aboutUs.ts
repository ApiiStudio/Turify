import { Component, Inject } from '@angular/core';
import { About } from '../../services/about/about';
import { Header } from '../../shared/header/header';
import { Nav } from '../../shared/nav/nav';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-aboutUs',
  imports: [Header, Nav, Footer],
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
