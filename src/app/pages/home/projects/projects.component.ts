import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  expandedCardIndex: number | null = null;

  constructor(public ele: ElementRef){}

  toggleClass(index: number) {
    this.expandedCardIndex = this.expandedCardIndex === index ? null : index;
  }

}
