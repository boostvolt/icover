"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import html2canvas from "html2canvas"
import { Cog, Info } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import AppleMusic from "@/components/icons/apple-music"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SfProDisplay } from "@/lib/fonts/sf-pro-display"

const formSchema = z.object({
  imageFormat: z.enum(["png", "jpeg"]),
  appleMusicLogo: z.boolean(),
  bigTitle: z.string(),
  subTitle: z.string(),
  footer: z.string(),
  gradient: z.string(),
  color: z.string(),
})

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formSchema.parse({
      imageFormat: "png",
      appleMusicLogo: true,
      bigTitle: "",
      subTitle: "",
      footer: "",
      gradient: "0",
      color: "",
    }),
  })
  const { dirtyFields } = form.formState
  const isEdited = dirtyFields.bigTitle ?? dirtyFields.subTitle ?? dirtyFields.footer

  const handleDownload = () => {
    const element = document.getElementById("coverElement")
    if (element) {
      html2canvas(element, { useCORS: true, allowTaint: true }).then((canvas) => {
        const link = document.createElement("a")
        link.download = `playlist-cover.${form.watch("imageFormat")}`
        link.href = canvas.toDataURL()
        link.click()
      })
    }
  }

  const [bigTitleFontSize, setBigTitleFontSize] = useState(3)
  const [subTitleFontSize, setSubTitleFontSize] = useState(2.5)
  const [footerFontSize, setFooterFontSize] = useState(1)

  const bigTitleRef = useRef(null)
  const subTitleRef = useRef(null)
  const footerRef = useRef(null)

  useEffect(() => {
    const getFontSizeToFit = (textRef: React.RefObject<HTMLDivElement>, maxWidth: number, defaultFontSize: number) => {
      if (!textRef.current) return defaultFontSize

      const textElement = textRef.current
      let currentFontSize = defaultFontSize
      textElement.style.fontSize = `${currentFontSize}em`

      while (textElement.offsetWidth > maxWidth) {
        currentFontSize -= 0.1
        textElement.style.fontSize = `${currentFontSize}em`
      }

      return currentFontSize
    }

    const maxWidth = 270

    const newBigTitleFontSize = getFontSizeToFit(bigTitleRef, maxWidth, 3)
    const newSubTitleFontSize = getFontSizeToFit(subTitleRef, maxWidth, 2.5)
    const newFooterFontSize = getFontSizeToFit(footerRef, maxWidth, 1)

    setBigTitleFontSize(newBigTitleFontSize)
    setSubTitleFontSize(newSubTitleFontSize)
    setFooterFontSize(newFooterFontSize)
  }, [form.watch("bigTitle"), form.watch("subTitle"), form.watch("footer")])

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
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-4">
                <CardTitle>iCover</CardTitle>
              </div>

              <div className="flex space-x-4">
                <Button onClick={handleDownload}>Download</Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" title="Toggle image format settings">
                      <Cog className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Image Format</DropdownMenuLabel>
                    <FormField
                      control={form.control}
                      name="imageFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <DropdownMenuRadioGroup onValueChange={field.onChange} value={field.value}>
                              <DropdownMenuRadioItem value="png">PNG</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="jpeg">JPEG</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div id="coverElement" style={{ width: 300, height: 300, position: "relative" }}>
                {/* Background Image */}
                <Image
                  src={`/assets/${
                    form.watch("color") === "" ? `gradients/${form.watch("gradient")}` : `colors/${form.watch("color")}`
                  }.png`}
                  loading="eager"
                  alt={`Gradient ${form.watch("gradient")}`}
                  layout="fill"
                  quality={100}
                  className="rounded-lg"
                />
                {/* Apple Logo */}
                {form.watch("appleMusicLogo") && (
                  <div style={{ position: "absolute", top: 10, left: 25 }}>
                    <AppleMusic fontSize={60} color="white" fill="white" />
                  </div>
                )}
                {/* Big Title */}
                <div style={{ position: "absolute", top: 55, left: 25 }}>
                  <h1
                    ref={bigTitleRef}
                    className="font-semibold text-white whitespace-nowrap"
                    style={{ fontSize: `${bigTitleFontSize}em` }}
                  >
                    {isEdited ? form.watch("bigTitle") : "Big Title"}
                  </h1>
                </div>
                {/* Sub Title */}
                <div style={{ position: "absolute", top: 105, left: 25 }}>
                  <h2 ref={subTitleRef} className="font-thin text-white whitespace-nowrap" style={{ fontSize: `${subTitleFontSize}em` }}>
                    {isEdited ? form.watch("subTitle") : "Sub Title"}
                  </h2>
                </div>
                {/* Footer */}
                <div style={{ position: "absolute", bottom: 25, left: 25 }}>
                  <h3
                    ref={footerRef}
                    className="text-white text-opacity-60 whitespace-nowrap"
                    style={{ fontSize: `${footerFontSize}em` }}
                  >
                    {isEdited ? form.watch("footer") : "Footer"}
                  </h3>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col space-y-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="apple-logo">Show Apple Music Logo</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-5 w-5 rounded-full hover:bg-accent hover:text-accent-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Could cause your cover to be removed.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <FormField
                  control={form.control}
                  name="appleMusicLogo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          title="Toggle Apple Music Logo"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bigTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Big Title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Sub Title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="footer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="Footer" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
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
                <TabsTrigger value="image" className="w-full">
                  Image
                </TabsTrigger>
              </TabsList>
              <TabsContent value="gradient" className="mt-4">
                <FormField
                  control={form.control}
                  name="gradient"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-5 gap-4"
                        >
                          {[...Array(40)].map((_, index) => (
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
                                  title={`Gradient ${index}`}
                                />
                                <Image
                                  src={`/assets/gradients/${index}.png`}
                                  alt={`Gradient ${index}`}
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
              </TabsContent>
              <TabsContent value="color" className="mt-4">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-5 gap-4"
                        >
                          {[...Array(7)].map((_, index) => (
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
                                  title={`Color ${index}`}
                                />
                                <Image
                                  src={`/assets/colors/${index}.png`}
                                  alt={`Color ${index}`}
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
                {/* <Input id="image" type="color" /> */}
              </TabsContent>
              <TabsContent value="image" className="mt-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Coming soon</AlertTitle>
                  <AlertDescription>Image upload will be available soon.</AlertDescription>
                </Alert>
                {/* <Input id="image" type="file" /> */}
              </TabsContent>
            </Tabs>
          </CardContent>

          <Separator className="mb-6" />

          <CardFooter>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="https://github.com/boostvolt"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                Boostvolt
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/boostvolt/i-cover"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </CardFooter>
        </Form>
      </Card>
    </main>
  )
}
