export interface Option {
  id: string;
  name: string;
}

export interface FormField {
  fieldType: string;
  id: string;
  name: string;
  type: string;
  value: any;
  required: boolean;
  readOnly: boolean;
  overrideId: boolean;
  placeholder: string | null;
  layout: any | null;
}

export interface OptionFormField extends FormField {
  optionType: string | null;
  hasEmptyValue: boolean | null;
  options: Option[];
  optionsExpression: string | null;
}

export interface Form {
  id: string;
  name: string;
  description: string | null;
  key: string;
  version: number;
  fields: (FormField | OptionFormField)[];
}
