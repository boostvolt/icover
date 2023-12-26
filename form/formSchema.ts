import { z } from "zod"

export const formSchema = z.object({
  appleMusicLogo: z.boolean(),
  bigTitle: z.string(),
  subTitle: z.string(),
  footer: z.string(),
  gradient: z.string(),
  color: z.string(),
})

export type FormValues = z.infer<typeof formSchema>
