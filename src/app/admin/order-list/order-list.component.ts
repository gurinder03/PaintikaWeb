import { Component, OnInit, ViewChild } from '@angular/core';
import jsonData from '../../core/jsonDummyData/orderlist.json';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  pageIndex: number = 1;
	pageSize: number = 10;
	length: number = 10;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginator') paginator!: MatPaginator;
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

  getData(event?: PageEvent) {
    this.pageIndex = event?.pageIndex ?? 0;
		this.pageSize = event?.pageSize ?? 10;
    let pageSize = event?.pageSize ?? 10;
		let pageNumber = event?.pageIndex ? event.pageIndex + 1 : 1;
    this.dataSource = new MatTableDataSource(jsonData);
    this.dataSource.paginator = this.paginator;
  }
}
