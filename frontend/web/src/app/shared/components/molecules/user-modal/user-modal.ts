import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { getFormErrorMessage } from '../../../helpers/get-form-error-message';


interface UserData {
  id: string
  name: string
  phone: string
}

interface CreateUserData {
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

  @Input() isVisible!: boolean
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() user?: UserData;

  @Output() createUser: EventEmitter<CreateUserData> = new EventEmitter<CreateUserData>();
  @Output() editUser: EventEmitter<UserData> = new EventEmitter<UserData>();

  public userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
  });

  private resetForm() {
    this.userForm.reset();
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

  public handleSave() {
    this.validateForm();
    if (!this.userForm.valid) return

    if (this.user) {
      const userData: UserData = {
        id: this.user.id,
        name: this.userForm.value.name ?? this.user.name,
        phone: this.userForm.value.phone!.replace(/\D/g, '') ?? this.user.phone
      }
      this.editUser.emit(userData)
    }
    else {
      const userData: CreateUserData = {
        name: this.userForm.value.name!,
        phone: this.userForm.value.phone!.replace(/\D/g, '')
      }
      this.createUser.emit(userData)
    }
  }

  public handleCancel() {
    this.changeIsVisible(false);
  }

  public changeIsVisible(value: boolean) {
    if (value == false) {
      this.resetForm();
    }

    this.isVisible = value;
    this.isVisibleChange.emit(this.isVisible)
  }
}
