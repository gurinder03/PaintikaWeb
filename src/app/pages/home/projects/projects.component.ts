import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  public isTransition = false;

  constructor(public ele: ElementRef){}

  public toggleClass(){
    debugger
    const element = this.ele.nativeElement;
    element.classList.toggle('cards');
    // this.isTransition = !this.isTransition;
  }

}
