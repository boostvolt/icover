"use client"

import { Info } from "lucide-react"
import { FC } from "react"
import { Control, FieldPath } from "react-hook-form"
import { FormValues } from "@/form/formSchema"
import { FormControl, FormField, FormItem } from "./ui/form"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface SwitchFieldWithTooltipProps<
  TFieldValues extends FormValues = FormValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  label: string
  tooltipContent: string
  switchTitle: string
}

export const SwitchFieldWithTooltip: FC<SwitchFieldWithTooltipProps> = (props) => (
  <div className="flex w-full items-center justify-between">
    <div className="flex items-center space-x-2">
      <Label htmlFor={props.name}>{props.label}</Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-5 w-5 rounded-full hover:bg-accent hover:text-accent-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{props.tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Switch checked={Boolean(field.value)} onCheckedChange={field.onChange} title={props.switchTitle} />
          </FormControl>
        </FormItem>
      )}
    />
  </div>
)
