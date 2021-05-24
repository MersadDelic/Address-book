import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {DataService} from "./data.service";

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {

    constructor(public snackBar: MatSnackBar, private dataService: DataService) {
    }

    config: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
    }


    warn(msg: string) {
        this.config['panelClass'] = ['notification', 'warn'];
        this.snackBar.open(msg, '', this.config);
    }

    success(msg: string) {
        this.config['panelClass'] = ['notification', 'success'];
        this.snackBar.open(msg, '', this.config);

    }


}

