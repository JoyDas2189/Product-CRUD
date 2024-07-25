import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinationsService } from '../../services/destinations.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-add-destinaitons',
  templateUrl: './add-destinaitons.component.html',
  styleUrl: './add-destinaitons.component.css'
})
export class AddDestinaitonsComponent implements OnInit{
  destinationForm!: FormGroup;
  actionBtn: string = 'Save';
  popular: string[] = ['Popular', 'UnPopular'];
  suggested: string[] = ['Recommended', 'Not Recommended'];

  constructor(
    private formBuilder: FormBuilder,
    private destinationService: DestinationsService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<AddDestinaitonsComponent>,
    private coreService: CoreService,
  ) {}
  ngOnInit(): void {
    this.destinationForm = this.formBuilder.group({
      destinationName: ['', Validators.required],
      description: ['', Validators.required],
      destinationTypeId: ['', Validators.required],
      isPopular: ['', Validators.required],
      isSuggested: ['', Validators.required]
    });

    if(this.editData) {
      this.actionBtn = 'Update'
      this.destinationForm.controls['destinationName'].setValue(
        this.editData.destinationName
      );
      this.destinationForm.controls['description'].setValue(
        this.editData.description
      );
      this.destinationForm.controls['destinationTypeId'].setValue(
        this.editData.destinationTypeId
      );
      this.destinationForm.controls['isPopular'].setValue(
        this.editData.isPopular
      );
      this.destinationForm.controls['isSuggested'].setValue(
        this.editData.isSuggested
      );
    }
  }

  addDestination() {
    if(!this.editData) {
      if(this.destinationForm.valid) {
        this.destinationService.postDestinations(this.destinationForm.value).subscribe({
          next: () => {
            this.coreService.openSnackBar('Blog Added Successfully','Done');
            this.destinationForm.reset();
            this.dialogRef.close(true)
          },
          error: (err:any) => {
            alert(err);
          },
        })
      }
    }
    else {
      this.updateDestination();
    }
  }
  updateDestination() {
    this.destinationService.putDestinations(this.destinationForm.value, this.editData.id).subscribe({
      next: () => {
        this.coreService.openSnackBar('Blog Updated Successfully', 'Done');
        this.destinationForm.reset();
        this.dialogRef.close(true);
      },
      error: (err:any) => {
        alert(err);
      },
    });
  }
}
