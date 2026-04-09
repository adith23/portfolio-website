export type ContactRequest = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

export type ContactResponse = {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactRequest, string[]>>;
};
