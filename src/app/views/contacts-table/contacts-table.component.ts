import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactModel} from 'src/app/models/contact.model';
import {ContactsService} from 'src/app/services/contacts.service';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent, ConfirmDialogModel} from '../confirmation-dialog/confirmation-dialog.components';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
    selector: 'app-contacts-table',
    templateUrl: './contacts-table.component.html',
    styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {
    @ViewChild(MatSort) sort!: MatSort;
    visibleColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'address', 'phoneNumber', 'actions'];
    contacts: ContactModel[] = [];
    dataSource!: MatTableDataSource<ContactModel>;
    isLoading!: boolean;
    result = '';
    length = 500;
    pageSize = 10;
    pageIndex = 1;
    pageSizeOptions = [5, 10, 25];
    showFirstLastButtons = true;
    searchTerm = '';

    constructor(private readonly contactsService: ContactsService,
                private router: Router,
                private dialog: MatDialog,
                private snackbarService: SnackbarService) {
    }

    ngOnInit(): void {
        this.getContacts();
    }

    deleteContact(id: number): void {
        const message = `Are you sure to delete this contact ?`;

        const dialogData = new ConfirmDialogModel('Confirm Action', message);

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            maxWidth: '400px',
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log(`Dialog result: ${result}`);
            if (result) {
                this.isLoading = true;
                this.contactsService.deleteContact(id).then(
                    res => {

                        const index = this.dataSource.data.findIndex(c => c.id = id);
                        this.dataSource.data.splice(index, 1);
                        this.setDataSource(this.dataSource.data);
                        this.snackbarService.success('Successfully deleted contact');
                        console.log('Contact successfully deleted with id:' + id);
                    })
                    .catch(error => {
                        this.snackbarService.warn('Error while deleting contact. ' + error.message);
                    })
                    .finally(
                        () =>
                            this.isLoading = false
                    );
            }
        });
    }


    handlePageEvent(event: PageEvent): void {
        this.length = event.length;
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex + 1;
        this.getContacts();

    }

    private setDataSource(data: ContactModel[]): void {
        this.dataSource = new MatTableDataSource<ContactModel>(data);
        this.dataSource.sort = this.sort;
    }

    private getContacts(): void {
        this.isLoading = true;
        this.contactsService.getContacts({
                perPage: this.pageSize,
                page: this.pageIndex,
            }
        ).then(result => {
            this.length = result.totalItems;
            this.pageSize = result.perPage;
            this.pageIndex = result.page;
            this.setDataSource(result.data);

        }).catch(error => {
            this.snackbarService.warn('Error getting contacts.  ' + error.message);
        })
            .finally(
                () =>
                    this.isLoading = false
            );
    }

    onSearchClear(): void {
        this.searchTerm = ' ';
        this.applyFilter();
    }

    applyFilter(): void {
        this.dataSource.filter = this.searchTerm.trim().toLowerCase();
    }

}
