import { zodResolver } from '@hookform/resolvers/zod'
import { InfoIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useStoreDilemmaMutation } from '../mutations'
import { PropositionImageDropzone } from './proposition_image_dropzone'

const schema = z.object({
  title: z.string().min(3, 'Le titre doit contenir minimum 3 caractères'),
  propositions: z
    .array(
      z.object({
        name: z.string().min(1, 'Nommez votre proposition'),
        image_url: z.string().url('Choisissez une image'),
      })
    )
    .length(2),
})

export type FormSchema = z.infer<typeof schema>

interface PropositionFormProps extends React.ComponentPropsWithoutRef<'div'> {}

export function PropositionForm({ className, ...props }: PropositionFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      propositions: [
        { name: '', image_url: '' },
        { name: '', image_url: '' },
      ],
    },
  })

  const mutation = useStoreDilemmaMutation()

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values, {
      onSuccess: () => {
        form.reset()
        toast.success('Votre proposition a bien été envoyée')
      },
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Order vs Chaos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p>Propositions</p>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={`proposition-${index}`} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name={`propositions.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder={`Proposition ${index + 1}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`propositions.${index}.image_url`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PropositionImageDropzone
                          className="h-96"
                          url={field.value}
                          onUrlChange={(url) => field.onChange(url)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <p className="[&_svg]:size-4 text-muted-foreground text-sm flex flex-row items-center gap-2">
            <InfoIcon />
            <span>Votre proposition sera mise en attente et traitée par un administrateur.</span>
          </p>
          <Button type="submit" className="w-fit self-end" disabled={mutation.isPending}>
            Envoyer
          </Button>
        </div>
      </form>
    </Form>
  )
}
