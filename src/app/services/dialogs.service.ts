import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../components/dialogs/delete-dialog/delete-dialog.component';
import { UpdateDialogComponent } from '../components/dialogs/update-dialog/update-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    private dialog: MatDialog,
  )
  { }

  deleteDialog() {
    this.dialog.open(DeleteDialogComponent);
  }

  updateDialog() {
    this.dialog.open(UpdateDialogComponent);
  }
}
