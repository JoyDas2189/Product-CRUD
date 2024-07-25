import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DestinationsService } from '../../services/destinations.service';
import { CoreService } from '../../core/core.service';
import { AddDestinaitonsComponent } from '../add-destinaitons/add-destinaitons.component';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrl: './destination-list.component.css'
})
export class DestinationListComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'destinationName',
    'description',
    'destinationTypeId',
    'isPopular',
    'isSuggested',
    'action'
  ];

  dataSource!:  MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog:MatDialog,
    private desticationService: DestinationsService,
    private coreService: CoreService

  ){}

  ngOnInit(): void {
    this.getDestinations();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDestinaitonsComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDestinations();
        }
      },
    });
    
  }

  getDestinations() {
    this.desticationService.getDestinations().subscribe({
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

  editDestination(row: any) {
    this.dialog
      .open(AddDestinaitonsComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this.getDestinations();
          }
        },
      });
  }

  deleteDestination(id: number) {
    this.desticationService.deleteDestinations(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Product Deleted Successfully', 'Done');
        this.getDestinations();
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
