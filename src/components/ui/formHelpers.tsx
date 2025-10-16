import * as React from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

export type FormItemContextValue = { id: string };
export const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

export const useFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>() => {
  const fieldContext = React.useContext(FormFieldContext as unknown as React.Context<FormFieldContextValue>);
  const itemContext = React.useContext(FormItemContext as unknown as React.Context<FormItemContextValue>);
  const { getFieldState, formState } = useFormContext<TFieldValues>();

  if (!fieldContext) throw new Error("useFormField should be used within <FormField>");

  const fieldName = (fieldContext as unknown as { name: string }).name as string;
  const fieldState = getFieldState(fieldName, formState as unknown as Record<string, unknown>);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...(fieldState as unknown as Record<string, unknown>),
  } as Record<string, unknown>;
};
