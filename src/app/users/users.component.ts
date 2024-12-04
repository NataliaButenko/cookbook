import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IUserBase } from '../shared/interfaces';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../components/loader/loader.component';

@Component({
  selector: 'app-users',
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  public loading: boolean = false;
  displayedColumns: string[] = [];
  dataSource?: MatTableDataSource<IUserBase>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usersService: UsersService) {
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.fetchData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource?.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  private fetchData() {
    this.loading = true
    this.usersService.getAllUsers().subscribe((data) => {
      if (data.length) {
        this.displayedColumns = Object.keys(data[0]);
        this.dataSource = new MatTableDataSource(data);
        if(this.dataSource) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        }
      }
    });
  }
}

// свитчер админов, переход на рецепты юзера, (редактирование юзера) 