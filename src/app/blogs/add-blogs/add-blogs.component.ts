import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../../services/blogs.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-add-blogs',
  templateUrl: './add-blogs.component.html',
  styleUrl: './add-blogs.component.css'
})
export class AddBlogsComponent implements OnInit{
  blogForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogsService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<AddBlogsComponent>,
    private coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      blogTitle: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      publishingDate: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
    if(this.editData) {
      this.actionBtn = 'Update'
      this.blogForm.controls['blogTitle'].setValue(
        this.editData.blogTitle
      );
      this.blogForm.controls['summary'].setValue(
        this.editData.summary
      );
      this.blogForm.controls['description'].setValue(
        this.editData.description
      );
      this.blogForm.controls['author'].setValue(
        this.editData.author
      );
      this.blogForm.controls['publishingDate'].setValue(
        this.editData.publishingDate
      );
      this.blogForm.controls['imageUrl'].setValue(
        this.editData.imageUrl
      );
    }
  }

  addBlog() {
    if(!this.editData) {
      if(this.blogForm.valid) {
        this.blogService.postBlogs(this.blogForm.value).subscribe({
          next: () => {
            this.coreService.openSnackBar('Blog Added Successfully','Dome');
            this.blogForm.reset();
            this.dialogRef.close(true)
          },
          error: (err:any) => {
            alert(err);
          },
        })
      }
    }
    else {
      this.updateBlog();
    }
  }
  updateBlog() {
    this.blogService.putBlogs(this.blogForm.value, this.editData.id).subscribe({
      next: () => {
        this.coreService.openSnackBar('Blog Updated Successfully', 'Done');
        this.blogForm.reset();
        this.dialogRef.close(true);
      },
      error: (err:any) => {
        alert(err);
      },
    });
  }
}
