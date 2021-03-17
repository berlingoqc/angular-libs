import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatQueueDialog } from './mat-queue-dialog';

@NgModule({
    imports: [CommonModule, MatDialogModule],
    providers: [MatQueueDialog],
    exports: [MatDialogModule]
})
export class MatQueueDialogModule {}