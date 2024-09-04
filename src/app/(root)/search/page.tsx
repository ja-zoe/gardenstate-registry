"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const SearchPage = () => {
    const FormSchema = z.object({
        municipality: z
            .string({
                required_error: 'Municipality selection required'
            })
    })

    type MunicipalityType = z.infer<typeof FormSchema>

    const form = useForm<MunicipalityType>({
        resolver: zodResolver(FormSchema),
    })

    async function handleFormSubmit(values: MunicipalityType) {
        const { municipality } = values
        const response = await fetch('/api/get-municipality-data', {
            method: 'POST',
            body: JSON.stringify(municipality)
        })
        console.log(response)
        console.log(values)
    }

  return (
    <div className="flex h-screen justify-center items-center">
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-2/3 space-y-6">
                    <FormField
                    control={form.control}
                    name="municipality"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Municipality</FormLabel>

                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl className="bg-black">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified municipality" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-black text-white">
                                    <SelectItem className="transition-colors hover:cursor-pointer" value="Alexandria TWP">Alexandria TWP</SelectItem>
                                    <SelectItem className="transition-colors hover:cursor-pointer" value="Allamuchy TWP">Allamuchy TWP</SelectItem>
                                    <SelectItem className="transition-colors hover:cursor-pointer" value="Allendale Boro">Allendale Boro</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription className="text-white">
                                This is the municipality we retrieve the registration data for
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <button type="submit" className="rounded-2xl px-4 py-3 outline outline-1 transition-colors hover:bg-white hover:text-black">Submit</button>
                </form>
            </Form>
        </div>
    </div>
  )
}
export default SearchPage