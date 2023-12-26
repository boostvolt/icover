"use client"

import Image from "next/image"
import { FC } from "react"
import { Control, FieldPath } from "react-hook-form"
import { FormValues } from "@/form/formSchema"
import { Avatar } from "./ui/avatar"
import { FormControl, FormField, FormItem } from "./ui/form"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

interface ImageRadioGroupProps<
  TFieldValues extends FormValues = FormValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  imageFolder: string
  count: number
}

export const ImageRadioGroup: FC<ImageRadioGroupProps> = (props) => (
  <FormField
    control={props.control}
    name={props.name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value.toString()}
            className="grid grid-cols-5 gap-4"
          >
            {[...Array(props.count)].map((_, index) => (
              <Label
                key={index}
                htmlFor={`${index}`}
                className="rounded-full border-2 border-muted bg-popover p-0.5 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <Avatar className="h-full w-full">
                  <RadioGroupItem
                    value={`${index}`}
                    id={`${index}`}
                    className="sr-only"
                    title={`${props.name.charAt(0).toUpperCase() + props.name.slice(1)} ${index}`}
                  />
                  <Image
                    src={`/assets/${props.imageFolder}/${index}.png`}
                    alt={`${props.name.charAt(0).toUpperCase() + props.name.slice(1)} ${index}`}
                    width={100}
                    height={100}
                  />
                </Avatar>
              </Label>
            ))}
          </RadioGroup>
        </FormControl>
      </FormItem>
    )}
  />
)
