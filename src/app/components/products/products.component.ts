import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    });
  }
}
