import { Component, OnInit, ViewChild } from '@angular/core';
import jsonData from '../../core/jsonDummyData/orderlist.json';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(){
    console.log('dataSource => ', jsonData);
  }

  ngOnInit(): void {
      
  }

  displayedColumns: string[] = ['position', 'name', 'quantity', 'email','status','transectionid','orderdate','imageUrl'];
  dataSource = new MatTableDataSource(jsonData);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
		this.empTbSort.disableClear = true;
		this.dataSource.sort = this.empTbSort;
	}
}
