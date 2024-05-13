import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  productForm!: FormGroup;
  brand: string[] = [
    'IPhone',
    'Samsung',
    'OnePlus',
    'Google',
    'Xaiomi',
    'LG',
    'Huawei',
    'OPPO',
    'Vivo',
    'Realme',
  ];
  freshness: string[] = ['Brand New', 'Second Hand', 'Refurbished'];

  constructor(
    private formBuilder: FormBuilder,
    private api:ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,

    ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productBrand: ['', Validators.required],
      date: ['', Validators.required],
      productFreshness: ['', Validators.required],
      productPrice: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }
  addProduct() {
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value).subscribe({
        next: (res) => {
          alert("Product Added Successfully.");
          this.productForm.reset();
          this.dialogRef.close();
        },
        error: (err:any) => {
          console.log(err)
        }
      })
    }
  }

}
