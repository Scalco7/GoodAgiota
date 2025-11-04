import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { getFormErrorMessage } from '../../../helpers/get-form-error-message';
import { ICreateUserRequest } from '../../../../api/users/create-user/create-user.interface';

export interface UserData {
  id: string
  name: string
  phone: string
}

@Component({
  standalone: true,
  selector: 'ga-user-modal',
  imports: [Dialog, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule, InputMaskModule],
  templateUrl: './user-modal.html',
  styleUrl: './user-modal.scss',
})
export class UserModalComponent {
  public messageService = inject(MessageService);

  @Output() createUser: EventEmitter<ICreateUserRequest> = new EventEmitter<ICreateUserRequest>();
  @Output() editUser: EventEmitter<UserData> = new EventEmitter<UserData>();

  public user?: UserData;
  public isLoading: boolean = false;
  public _isVisible: boolean = false;

  public userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
  });

  private resetForm() {
    this.userForm.reset();
    this.isLoading = false;
  }

  private loadEditData() {
    this.userForm.get('name')?.setValue(this.user?.name ?? '')
    this.userForm.get('phone')?.setValue(
      this.user?.phone.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{1})(\d{4})(\d{4})$/, '$1 $2-$3')
      ?? ''
    )
    this.userForm.updateValueAndValidity()
  }

  private validateForm(): void {
    Object.values(this.userForm.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity();

      if (control.invalid) {
        const errorMessage = getFormErrorMessage(control);
        if (errorMessage) {
          this.showFormError(errorMessage);
        }
      }
    });
  }

  private showFormError(message: string): void {
    this.messageService.add({ severity: 'error', summary: 'Erro de preenchimento', detail: message, life: 3000 })
  }

  public open(user?: UserData) {
    this.user = user;
    this.resetForm();
    if (this.user) this.loadEditData();

    this._isVisible = true;
  }

  public close() {
    this._isVisible = false;
  }

  public handleSave() {
    this.isLoading = true;
    this.validateForm();
    if (!this.userForm.valid) {
      this.isLoading = false;
      return
    }

    if (this.user) {
      const userData: UserData = {
        id: this.user.id,
        name: this.userForm.value.name ?? this.user.name,
        phone: this.userForm.value.phone!.replace(/\D/g, '') ?? this.user.phone
      }
      this.editUser.emit(userData)
    }
    else {
      const userData: ICreateUserRequest = {
        name: this.userForm.value.name!,
        phone: this.userForm.value.phone!.replace(/\D/g, '')
      }
      this.createUser.emit(userData)
    }
  }

  public handleCancel() {
    this._isVisible = false
  }
}
