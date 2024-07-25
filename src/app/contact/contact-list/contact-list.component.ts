import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactService } from '../../services/contact.service';
import { CoreService } from '../../core/core.service';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'type',
    'info',
    'icon',
    'Phone',
    'email',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private contactService: ContactService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getContact();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContact();
        }
      },
    });
  }

  getContact() {
    this.contactService.getContact().subscribe({
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

  editContact(row: any) {
    this.dialog
      .open(AddContactComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe({
        next: (val) => {
          if (val) {
            this.getContact();
          }
        },
      });
  }
  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Contact Deleted Successfully', 'Done');
        this.getContact();
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
