"use client"

import { FC } from "react"
import { Control, FieldPath } from "react-hook-form"
import { FormValues } from "@/form/formSchema"
import { FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"

interface TextFieldProps<
  TFieldValues extends FormValues = FormValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  placeholder: string
}

export const TextField: FC<TextFieldProps> = (props) => (
  <FormField
    control={props.control}
    name={props.name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input type="text" placeholder={props.placeholder} {...field} value={field.value?.toString()} />
        </FormControl>
      </FormItem>
    )}
  />
)
