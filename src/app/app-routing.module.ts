import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactsTableComponent} from './views/contacts-table/contacts-table.component';
import {EditContactComponent} from './views/edit-contact/edit-contact.component';

const routes: Routes = [
    {path: '', component: ContactsTableComponent},
    {path: 'add', component: EditContactComponent},
    {path: 'edit/:id', component: EditContactComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
