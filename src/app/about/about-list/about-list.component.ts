import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core.service';
import { BlogsService } from '../../services/blogs.service';
import { AboutService } from '../../services/about.service';
import { AddAboutComponent } from '../add-about/add-about.component';

@Component({
  selector: 'app-about-list',
  templateUrl: './about-list.component.html',
  styleUrl: './about-list.component.css',
})
export class AboutListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'topic',
    'description',
    'imageUrl',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private aboutService: AboutService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getAbout();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddAboutComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAbout();
        }
      },
    });
  }

  getAbout() {
    this.aboutService.getAbout().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        alert(err);
      },
    });
  }

  editAbout(row: any) {
    this.dialog
      .open(AddAboutComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this.getAbout();
          }
        },
      });
  }
  deleteAbout(id: number) {
    this.aboutService.deleteAbout(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('About Deleted Successfully', 'Done');
        this.getAbout();
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
