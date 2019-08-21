import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResturantRoutingModule } from './resturant-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, LayoutComponent],
  imports: [
    CommonModule,
    ResturantRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ResturantModule { }
