import {Component, OnInit} from '@angular/core';
import {ContactModel, ContactWriteModel} from '../../models/contact.model';
import {ContactsService} from '../../services/contacts.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
    formGroup: FormGroup;
    id!: number;
    contact: ContactWriteModel = {} as ContactWriteModel;
    contacts: ContactModel[] = [];
    isAddMode!: boolean;
    isLoading!: boolean;

    constructor(private contactsService: ContactsService,
                private formBuilder: FormBuilder,
                private location: Location,
                private route: ActivatedRoute,
                private router: Router,
                private snackbarService: SnackbarService) {

        this.formGroup = new FormGroup({
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            emailAddress: new FormControl(null, [Validators.pattern('^[a-zA-Z0-9_\\-\\.]+[@)][a-z]+[\\.][a-z]{2,3}$')]),
            address: new FormControl(null),
            phoneNumber: new FormControl(null, [Validators.pattern('^\\+?(\\s?\\d+\\s?)+$')])
        });
    }

    ngOnInit(): void {
        this.isLoading = true;
        // @ts-ignore
        this.id = +this.route.snapshot.paramMap.get('id');
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.getContactAndFillForm(this.id);
        } else {
            this.isLoading = false;
        }
    }

    onSubmit(): void {
        this.isLoading = true;
        if (this.formGroup.valid) {
            const contact = {
                firstName: this.formGroup.value.firstName,
                lastName: this.formGroup.value.lastName,
                address: this.formGroup.value.address,
                phoneNumber: this.formGroup.value.phoneNumber,
                emailAddress: this.formGroup.value.emailAddress
            } as ContactWriteModel;

            if (this.isAddMode) {
                this.contactsService.createContact(contact).then(
                    createdContact => {
                        console.log(createdContact);
                        this.snackbarService.success('Successfully added new contact');
                        this.router.navigateByUrl('');
                    })
                    .catch(error => {
                        this.snackbarService.warn('Error adding contact. ' + error.message);
                    })
                    .finally(
                        () =>
                            this.isLoading = false
                    );

            } else {
                this.contactsService.updateContact(this.id, contact).then(
                    updatedContact => {
                        console.log(updatedContact);
                        this.snackbarService.success('Successfully updated contact');
                        this.router.navigateByUrl('');
                    })
                    .catch(error => {
                        this.snackbarService.warn('Error updating contact. ' + error.message);
                    })
                    .finally(
                        () =>
                            this.isLoading = false
                    );
            }
        }

    }

    getContactAndFillForm(id: number): void {
        this.contactsService.getContactById(id)
            .then(res => {
                this.formGroup.patchValue(res);

            })
            .catch(error => {
                this.snackbarService.warn('Error loading contact. ' + error.message);
            })
            .finally(
                () =>
                    this.isLoading = false
            );
    }
}

