import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinationTypeService } from '../../services/destination-type.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-add-destination-type',
  templateUrl: './add-destination-type.component.html',
  styleUrl: './add-destination-type.component.css',
})
export class AddDestinationTypeComponent implements OnInit {
  destinationTypeFrom!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private destinationTypeService: DestinationTypeService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddDestinationTypeComponent>,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.destinationTypeFrom = this.formBuilder.group({
      destinationType: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.destinationTypeFrom.controls['destinationType'].setValue(
        this.editData.destinationType
      );
      this.destinationTypeFrom.controls['description'].setValue(
        this.editData.description
      );
    }
  }

  addDestinationType() {
    if (!this.editData) {
      if (this.destinationTypeFrom.valid) {
        this.destinationTypeService
          .postDestinationType(this.destinationTypeFrom.value)
          .subscribe({
            next: () => {
              this.coreService.openSnackBar('Blog Added Successfully', 'Done');
              this.destinationTypeFrom.reset();
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              alert(err);
            },
          });
      }
    } else {
      this.updateDestinationType();
    }
  }

  updateDestinationType() {
    this.destinationTypeService
      .putDestinationType(this.destinationTypeFrom.value, this.editData.id)
      .subscribe({
        next: () => {
          this.coreService.openSnackBar('Blog Updated Successfully', 'Done');
          this.destinationTypeFrom.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          alert(err);
        },
      });
  }
}
