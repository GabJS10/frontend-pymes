import { FieldErrors, UseFormRegister } from "react-hook-form"

export enum Roles {
    ADMIN = 'ADMIN',
    USER_BUSSINESS = 'USER_BUSSINESS',
    USER_CLIENT = 'USER_CLIENT',
}

export type Inputs = {
    name: string
    email: string
    password: string
    password_confirmation?: string
    name_url: string
    holder: string
    whatsapp_contact: string
    locality: string
    shipping_cost: number
    contact_name: string
    number_contact: string 
    social_media_contact?: string
}

export type FormDataBuy = {
    name: string;
    lastName: string;
    document: string;
    direction: string;
    op1: string | null;
    op2: string | null;
  };

export type InputsErrors = {
    emptyForm1: boolean
    emptyForm2:boolean
    emptyForm3:boolean
}

export interface FormStepsProps {
    register: UseFormRegister<Inputs>;
    handleNext: () => void;
    handleBack: () => void;
    errors: InputsErrors;
    errorsReactHookForm: FieldErrors<Inputs>;
}