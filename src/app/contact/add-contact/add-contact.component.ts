import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddBlogsComponent } from '../../blogs/add-blogs/add-blogs.component';
import { CoreService } from '../../core/core.service';
import { BlogsService } from '../../services/blogs.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css',
})
export class AddContactComponent implements OnInit {
  contactForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddContactComponent>,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      type: ['', Validators.required],
      info: ['', Validators.required],
      icon: ['', Validators.required],
      Phone: ['', Validators.required],
      email: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.contactForm.controls['type'].setValue(this.editData.type);
      this.contactForm.controls['info'].setValue(this.editData.info);
      this.contactForm.controls['icon'].setValue(this.editData.icon);
      this.contactForm.controls['Phone'].setValue(this.editData.Phone);
      this.contactForm.controls['email'].setValue(this.editData.email);
    }
  }

  addContact() {
    if (!this.editData) {
      if (this.contactForm.valid) {
        this.contactService.postContact(this.contactForm.value).subscribe({
          next: () => {
            this.coreService.openSnackBar('Contact Added Successfully', 'Done');
            this.contactForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            alert(err);
          },
        });
      }
    } else {
      this.updateContact();
    }
  }

  updateContact() {
    this.contactService
      .putContact(this.contactForm.value, this.editData.id)
      .subscribe({
        next: () => {
          this.coreService.openSnackBar('Contact Updated Successfully', 'Done');
          this.contactForm.reset();
          this.dialogRef.close(true);
        },
        error: (err: any) => {
          alert(err);
        },
      });
  }
}
