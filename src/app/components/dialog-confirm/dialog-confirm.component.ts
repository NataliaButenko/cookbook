import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-dialog-confirm',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-confirm.component.html',
  styleUrl: './dialog-confirm.component.scss'
})
export class DialogConfirmComponent {

  readonly dialogRef = inject(MatDialogRef<DialogConfirmComponent>);
  public data = inject<DialogData>(MAT_DIALOG_DATA);

  confirm(){
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
