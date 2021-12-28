import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interface/IUser.model';
import { DataManipulationService } from 'src/app/services/data-manipulation.service';
import { generateKeywords } from 'src/app/services/generate-keywords.service';
import { UserStore } from 'src/app/stores/user.store';


@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {
  form:any = FormGroup;
  firstname!: AbstractControl;
  lastname!: AbstractControl;
  email!: AbstractControl;
  address!: AbstractControl;
  city!: AbstractControl;
  state!: AbstractControl;
  password!: AbstractControl;
  constructor(
    private router: Router,
    private userStore: UserStore,
    private f: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  buildForm(): void {
    this.form = this.f.group({
      firstname: [this.data.firstname, Validators.required],
      lastname: [this.data.lastname, Validators.required],
      email: [this.data.email, Validators.required],
      address0: new FormGroup({
        address: new FormControl(this.data.address.address),
        city: new FormControl(this.data.address.city),
        state: new FormControl(this.data.address.state),
      }),
      password:[this.data.password, Validators.required],
    })

    this.firstname = this.form.controls['firstname'];
    this.lastname = this.form.controls['lastname'];
    this.email = this.form.controls['email'];
    this.address = this.form.controls['address'];
    this.city = this.form.controls['city'];
    this.state = this.form.controls['state'];
    this.password = this.form.controls['password'];
  }
  ngOnInit() {
    this.buildForm();
  }

  updateUser(f: any) {
    console.log('lastname updated:', this.form.lastname);

    if (this.form.valid) {
      //console.log('lastname updated1:', this.form.lastname);
      this.form.disable();
      const { firstname, lastname, email, address0, password} = f;
      console.log(this.data)
      console.log(address0)
      const docForm: any = {
        key: this.data.key,
        updatedAt: new Date(),
        updatedBy: null,
        dateKey: DataManipulationService.dateKey(),
        pageKey: DataManipulationService.pageKey(),
        keywords: generateKeywords([firstname, lastname]),

        firstname,
        lastname,
        email,
        address: address0,
        password,
      }
      this.userStore.updateItem(docForm, (success: any, error: any) => {
        if(success) {
          this.dialogRef.close();
          this.snackBar.open('Update Successfully!: ', 'done', { duration: 2500});
          this.form.enable();
          this.form.reset();
        }
       else {
         alert(error);
       }
      })
    }
  }

  onClickUpateAgent() {
    this.dialogRef.close(this.data);
  }

  onClickCancel() {
    this.dialogRef.close();
  }
}
