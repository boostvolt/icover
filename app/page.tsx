"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Cover } from "@/components/cover"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ImageRadioGroup } from "@/components/image-radio-group"
import { SwitchFieldWithTooltip } from "@/components/switch-field-with-tooltip"
import { TextField } from "@/components/text-field"
import { Card, CardContent } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DEFAULT_FORM_VALUES } from "@/form/formConstants"
import { formSchema, FormValues } from "@/form/formSchema"
import { useAdjustFontSize, useDownloadCanvas } from "@/hooks/useHooks"
import { SfProDisplay } from "@/lib/fonts/sf-pro-display"

export default function Home() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  })
  const { dirtyFields } = form.formState
  const isEdited = dirtyFields.bigTitle ?? dirtyFields.subTitle ?? dirtyFields.footer ?? false

  const bigTitleRef = useRef(null)
  useAdjustFontSize(bigTitleRef, form.watch("bigTitle"), 3)

  const subTitleRef = useRef(null)
  useAdjustFontSize(subTitleRef, form.watch("subTitle"), 2.5)

  const footerRef = useRef(null)
  useAdjustFontSize(footerRef, form.watch("footer"), 1)

  useEffect(() => {
    form.setValue("color", "")
  }, [form.watch("gradient")])

  return (
    <main className="flex justify-center">
      <style jsx global>{`
        html {
          font-family: ${SfProDisplay.style.fontFamily};
        }
      `}</style>
      <Card className="w-full max-w-[500px] border-0">
        <Form {...form}>
          <Header onDownloadClick={useDownloadCanvas("coverElement", "icover.png")} />

          <CardContent>
            <div className="flex justify-center">
              <Cover
                gradient={form.watch("gradient")}
                color={form.watch("color")}
                isAppleMusicLogoVisible={form.watch("appleMusicLogo")}
                bigTitle={form.watch("bigTitle")}
                subTitle={form.watch("subTitle")}
                footer={form.watch("footer")}
                isEdited={isEdited}
                bigTitleRef={bigTitleRef}
                subTitleRef={subTitleRef}
                footerRef={footerRef}
              />
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col space-y-4">
              <SwitchFieldWithTooltip
                control={form.control}
                name="appleMusicLogo"
                label="Show Apple Music Logo"
                tooltipContent="Could cause your cover to be removed."
                switchTitle="Toggle Apple Music Logo"
              />
              <TextField control={form.control} name="bigTitle" placeholder="Big Title" />
              <TextField control={form.control} name="subTitle" placeholder="Sub Title" />
              <TextField control={form.control} name="footer" placeholder="Footer" />
            </div>

            <Separator className="my-6" />

            <Tabs defaultValue="gradient">
              <TabsList className="w-full">
                <TabsTrigger value="gradient" className="w-full">
                  Gradient
                </TabsTrigger>
                <TabsTrigger value="color" className="w-full">
                  Color
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gradient" className="mt-4">
                <ImageRadioGroup control={form.control} name="gradient" imageFolder="gradients" count={40} />
              </TabsContent>
              <TabsContent value="color" className="mt-4">
                <ImageRadioGroup control={form.control} name="color" imageFolder="colors" count={7} />
              </TabsContent>
            </Tabs>
          </CardContent>

          <Separator className="mb-6" />

          <Footer />
        </Form>
      </Card>
    </main>
  )
}
