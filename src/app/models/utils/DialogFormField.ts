import { ValidatorFn } from "@angular/forms";

export interface DialogFormField {
    key: string;
    label: string;
    type?: 'text' | 'textarea' | 'number' | 'email'; // extensible
    placeholder?: string;
    required?: boolean;
    validators?: ValidatorFn[];
}