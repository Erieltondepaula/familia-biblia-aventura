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
  const fieldContext = React.useContext(FormFieldContext as React.Context<FormFieldContextValue>);
  const itemContext = React.useContext(FormItemContext as React.Context<FormItemContextValue>);
  const methods = useFormContext<TFieldValues>();

  if (!fieldContext) throw new Error("useFormField deve ser usado dentro de <FormField>");
  if (!itemContext) throw new Error("useFormField deve ser usado dentro de <FormItem>");

  const fieldName = (fieldContext as unknown as { name: string }).name as string;
  const fieldState = methods.getFieldState(fieldName as unknown as FieldPath<TFieldValues>, methods.formState);
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
