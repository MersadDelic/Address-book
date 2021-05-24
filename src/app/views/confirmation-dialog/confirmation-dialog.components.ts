import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
    title: string;
    message: string;

    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
        // Update view with given values
        this.title = data.title;
        this.message = data.message;
    }

    ngOnInit(): void {
    }

    onConfirm(): void {
        // Close the dialog, return true
        this.dialogRef.close(true);
    }

    onDismiss(): boolean {
        // Close the dialog, return false
        this.dialogRef.close(false)
        return false;
    }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class ConfirmDialogModel {

    constructor(public title: string, public message: string) {
    }
}

