import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interface/IUser.model';
import { DataManipulationService } from 'src/app/services/data-manipulation.service';
import { DataService } from 'src/app/services/data.service';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private userStore: UserStore,
    private afs: AngularFirestore,
    private formbuilder: FormBuilder,
    private ds: DataService,
    private router: Router,
  ) {
    this.form = formbuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl(''),
      email: new FormControl(''),
      address: new FormGroup({
        address: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
      }),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.userStore.getUsers();
    // this.userStore.getUsers(this.ds.userRef());
  }

  onFormSubmit(formData: any) {
    console.log(formData);

    if(!this.form.valid) return;
    const key = this.afs.createId();
    const { firstname, lastname, email, address, password } = formData.value;

    const data : IUser = {
      key,
      createdAt: new Date(),
      createdBy: null,
      updatedAt: new Date(),
      updatedBy: null,
      dateKey: DataManipulationService.dateKey(),
      pageKey: DataManipulationService.pageKey(),
      isDeleted: false,
      isPublished: true,
      keywords: [],

      firstname,
      lastname,
      email,
      address,
      password,
    }
    this.userStore.addUsers(data);
    this.userStore.registerUser(email, password);
    this.form.reset();
    alert("Created Successfully!");
    this.router.navigate(['/login']);
  }
}
