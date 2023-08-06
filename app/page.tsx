"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import html2canvas from "html2canvas"
import { Cog, Info } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import * as z from "zod"
import AppleMusic from "@/components/icons/apple-music"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
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
    }),
  })

  const handleDownload = () => {
    const element = document.getElementById("coverElement")
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a")
        link.download = `playlist-cover.${form.watch("imageFormat")}`
        link.href = canvas.toDataURL()
        link.click()
      })
    }
  }

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
                    <Button variant="outline" size="icon">
                      <Cog className="h-5 w-5" />
                      <span className="sr-only">Toggle image format settings</span>
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
                  src={`/assets/gradients/${form.watch("gradient")}.png`}
                  alt="0"
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
                  <h1 className="text-[3em] font-semibold text-white">{form.watch("bigTitle")}</h1>
                </div>
                {/* Sub Title */}
                <div style={{ position: "absolute", top: 105, left: 25 }}>
                  <h2 className="text-[2.5em] font-thin text-white">{form.watch("subTitle")}</h2>
                </div>
                {/* Footer */}
                <div style={{ position: "absolute", bottom: 25, left: 25 }}>
                  <h3 className="text-sm text-slate-300">{form.watch("footer")}</h3>
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
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                <Separator orientation="vertical" />
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
                          {[...Array(30)].map((_, index) => (
                            <Label
                              key={index}
                              htmlFor={`${index}`}
                              className="rounded-full border-2 border-muted bg-popover p-0.5 hover:cursor-pointer hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                            >
                              <Avatar className="h-full w-full">
                                <RadioGroupItem value={`${index}`} id={`${index}`} className="sr-only" />
                                <AvatarImage src={`/assets/gradients/${index}.png`} alt={`${index}`} />
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
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Coming soon</AlertTitle>
                  <AlertDescription>Color selection will be available soon.</AlertDescription>
                </Alert>
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