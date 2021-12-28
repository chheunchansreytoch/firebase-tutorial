import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interface/IUser.model';
import { DataManipulationService } from 'src/app/services/data-manipulation.service';
import { DataService } from 'src/app/services/data.service';
import { generateKeywords } from 'src/app/services/generate-keywords.service';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-add-user-page',
  templateUrl: './add-user-page.component.html',
  styleUrls: ['./add-user-page.component.scss']
})
export class AddUserPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private userStore: UserStore,
    private afs: AngularFirestore,
    private formbuilder: FormBuilder,
    private ds: DataService,
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
      keywords: generateKeywords([firstname, lastname]),

      firstname,
      lastname,
      email,
      address,
      password,
    }
    this.userStore.addUsers(data);
    this.form.reset();
    alert("Created Successfully!")
  }

}
