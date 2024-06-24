import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;
  actionBtn: string = 'Save';
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
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productBrand: ['', Validators.required],
      date: ['', Validators.required],
      productFreshness: ['', Validators.required],
      productPrice: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['productBrand'].setValue(
        this.editData.productBrand
      );
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['productFreshness'].setValue(
        this.editData.productFreshness
      );
      this.productForm.controls['productPrice'].setValue(
        this.editData.productPrice
      );
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: () => {
            this.coreService.openSnackBar('Product Added Successfully', 'Done');
            this.productForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            alert(err);
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }
  
  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: () => {
        this.coreService.openSnackBar('Product Updated Successfully', 'Done');
        this.productForm.reset();
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        alert(err);
      },
    });
  }
}
