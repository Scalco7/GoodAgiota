import { FormControl } from "@angular/forms";

export function getFormErrorMessage(control: FormControl<any | null>): string | null {
    console.log(control)
    if (!control || !control.errors) return null;

    if (control.hasError('required')) return 'Campo obrigatório';
    if (control.hasError('minlength'))
        return `Mínimo de ${control.getError('minlength').requiredLength} caracteres`;
    if (control.hasError('maxlength'))
        return `Máximo de ${control.getError('maxlength').requiredLength} caracteres`;
    if (control.hasError('min'))
        return `O valor mínimo é ${control.getError('min').min}`;
    if (control.hasError('max'))
        return `O valor máximo é ${control.getError('max').max}`;
    if (control.hasError('email')) return 'E-mail inválido';

    return null;
}