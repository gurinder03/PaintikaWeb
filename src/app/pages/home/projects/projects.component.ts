import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  transitionClass = false;

  constructor(public ele: ElementRef){}

  toggleClass() {
    this.transitionClass = !this.transitionClass;
  }

}
