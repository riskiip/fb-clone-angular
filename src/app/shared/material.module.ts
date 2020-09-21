import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const MaterialComponent = [
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [],
  imports: [MaterialComponent],
  exports: [MaterialComponent]
})
export class MaterialModule { }
