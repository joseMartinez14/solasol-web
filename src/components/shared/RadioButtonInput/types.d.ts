export interface Props {
  data: Data[];
  disabled?: boolean;
  control: any;
  title?: string;
  formValue: string;
  error?: string;
  customStyles?: any;
  isRequired?: boolean;
}

export interface Data {
  description: string;
  details?: string;
  value: string;
}
