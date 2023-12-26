import { formSchema } from "./formSchema"

export const DEFAULT_FORM_VALUES = formSchema.parse({
  appleMusicLogo: true,
  bigTitle: "",
  subTitle: "",
  footer: "",
  gradient: "0",
  color: "",
})
