import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { UserStore } from 'src/app/stores/user.store';
import { Location } from '@angular/common';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/components/dialogs/delete-dialog/delete-dialog.component';
import { IUser } from 'src/app/interface/IUser.model';
import { result } from 'lodash';
import { UpdateDialogComponent } from 'src/app/components/dialogs/update-dialog/update-dialog.component';
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  keyword: string = '';

  sortedData!: any;

  constructor(
    public userStore: UserStore,
    private ds: DataService,
    private afs: AngularFirestore,
    private location: Location,
    private router: Router,
    public dialog: MatDialog,
    private dialogService: DialogsService,
  ) {
    //this.sortedData = this.userStore.data.slice();
  }

  txtSearchChanged(event: any) {
    const keyword: string = event.target.value;
    this.keyword = keyword;
    //this.keyword = keyword;
    console.log(this.keyword);
  }

  btnSearchClicked() {
    const currentUrl = this.location.path();
    //console.log('Hi: ', currentUrl);
    console.log(currentUrl);
    if (currentUrl.includes('/home-page'))
      this.userStore.fetchData(this.keyword, { isDeleted: true }, null);
    else console.log('No user Found!');
  }

  onClickedDelete() {
    this.dialogService.deleteDialog();
  }

  onClickEdit(item: IUser) {
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      data: item,
      width: '40vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0' });
  }

  onClickDelete(item: IUser) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: item,
      width: '30vw',
     // height: '100vh',
      //disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userStore.deleteItem(item ,(success:any,error:any) => {
          try {
            if(success) {
              alert('This user has deleted.');
            }
          } catch (error) {
            console.log(error);

          }
        })
      }
    })
  }

  onClickSignOut() {
    this.userStore.signOut();
  }

  ngOnInit(): void {
    this.userStore.fetchData(null, null, null);
  }

  //createCasetoogleTag
  onclickListIcon: boolean = false;
  createCasetoogleTag() {
    this.onclickListIcon = !this.onclickListIcon;
  }
}
