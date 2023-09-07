import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import jsonData from '../../core/jsonDummyData/paintinglist.json';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-painting-list',
  templateUrl: './painting-list.component.html',
  styleUrls: ['./painting-list.component.scss']
})
export class PaintingListComponent implements OnInit {

  @ViewChild('empTbSort') empTbSort = new MatSort();

  constructor(){
    console.log('dataSource => ', jsonData);
    
  }

  ngOnInit(): void {
      
  }

  displayedColumns: string[] = ['position', 'name', 'frame','size',  'price' , 'medium','theme','imageUrl'];
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
