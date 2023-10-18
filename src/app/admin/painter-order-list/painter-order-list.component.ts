import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-painter-order-list',
  templateUrl: './painter-order-list.component.html',
  styleUrls: ['./painter-order-list.component.scss']
})
export class PainterOrderListComponent {
  constructor(
    public router: Router
  ){}

  viewOrderList(){
    this.router.navigate(['/admin/painter-order-list-view'])
  }
}
