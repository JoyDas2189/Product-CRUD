import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBlogsComponent } from '../add-blogs/add-blogs.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BlogsService } from '../../services/blogs.service';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.css'
})
export class BlogsListComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'blogTitle',
    'summary',
    'description',
    'author',
    'publishingDate',
    'imageUrl',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog:MatDialog,
    private blogService:BlogsService,
    private coreService:CoreService
  ) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBlogsComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBlogs();
        }
      },
    });
    
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err:any) => {
        alert(err);
      }
    })
  }

  editProduct(row: any) {
    this.dialog
      .open(AddBlogsComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this.getBlogs();
          }
        },
      });
  }


  deleteProduct(id: number) {
    this.blogService.deleteBlogs(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Product Deleted Successfully', 'Done');
        this.getBlogs();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
