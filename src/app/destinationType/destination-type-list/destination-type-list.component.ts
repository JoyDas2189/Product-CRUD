import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DestinationTypeService } from '../../services/destination-type.service';
import { CoreService } from '../../core/core.service';
import { AddDestinationTypeComponent } from '../add-destination-type/add-destination-type.component';

@Component({
  selector: 'app-destination-type-list',
  templateUrl: './destination-type-list.component.html',
  styleUrl: './destination-type-list.component.css',
})
export class DestinationTypeListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'destinationType',
    'description',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private destinationTypeService: DestinationTypeService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getDestinationType();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDestinationTypeComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDestinationType();
        }
      },
    });
  }

  getDestinationType() {
    this.destinationTypeService.getDestinationType().subscribe({
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
  editDestinationType(row: any) {
    this.dialog
      .open(AddDestinationTypeComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this.getDestinationType();
          }
        },
      });
  }

  deleteDestinationType(id: number) {
    this.destinationTypeService.deleteDestinationType(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Product Deleted Successfully', 'Done');
        this.getDestinationType();
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
