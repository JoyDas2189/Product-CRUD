import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddBlogsComponent } from '../../blogs/add-blogs/add-blogs.component';
import { CoreService } from '../../core/core.service';
import { BlogsService } from '../../services/blogs.service';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-add-about',
  templateUrl: './add-about.component.html',
  styleUrl: './add-about.component.css',
})
export class AddAboutComponent {
  aboutForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private aboutService: AboutService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddAboutComponent>,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.aboutForm = this.formBuilder.group({
      topic: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.aboutForm.controls['topic'].setValue(this.editData.topic);
      this.aboutForm.controls['description'].setValue(
        this.editData.description
      );
      this.aboutForm.controls['imageUrl'].setValue(this.editData.imageUrl);
    }
  }
  addAbout() {
    if (!this.editData) {
      if (this.aboutForm.valid) {
        this.aboutService.postAbout(this.aboutForm.value).subscribe({
          next: () => {
            this.coreService.openSnackBar('About Added Successfully', 'Dome');
            this.aboutForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            alert(err);
          },
        });
      }
    } else {
      this.updateAbout();
    }
  }
  updateAbout() {
    this.aboutService
      .putAbout(this.aboutForm.value, this.editData.id)
      .subscribe({
        next: () => {
          this.coreService.openSnackBar('About Updated Successfully', 'Done');
          this.aboutForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          alert(err);
        },
      });
  }
}
