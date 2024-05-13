import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  category: string[] = [
    'Fruits',
    'Vegetables',
    'Electronics',
  ]
  freshness:string[] = [
    'Brand New',
    'Second Hand',
    'Refurbished',
  ]
}
