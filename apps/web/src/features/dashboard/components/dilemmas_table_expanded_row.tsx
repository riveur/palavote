import { zodResolver } from '@hookform/resolvers/zod'
import type { Row } from '@tanstack/react-table'
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
import { PropositionImageDropzone } from '@/features/vote/components/proposition_image_dropzone'
import { cn } from '@/lib/utils'
import type { Dilemma } from '@/library/types'
import { useToggleApproveDilemmaMutation, useUpdateDilemmaMutation } from '../mutations'

const schema = z.object({
  title: z.string().min(3, 'Le titre doit contenir minimum 3 caractères'),
  propositions: z
    .array(
      z.object({
        id: z.number(),
        name: z.string().min(1, 'Nommez votre proposition'),
        image_url: z.string().url('Choisissez une image'),
      })
    )
    .length(2),
})

export type FormSchema = z.infer<typeof schema>

interface DilemmasTableExpandedRowProps extends React.ComponentProps<'div'> {
  row: Row<Dilemma>
}

export function DilemmasTableExpandedRow({
  row,
  className,
  ...props
}: DilemmasTableExpandedRowProps) {
  const { original: dilemma } = row

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: dilemma.title,
      propositions: dilemma.propositions.map((proposition) => ({
        id: proposition.id,
        name: proposition.name,
        image_url: proposition.imageUrl,
      })),
    },
  })

  const { mutate: toggleApprove, isPending: toggleApproveIsPending } =
    useToggleApproveDilemmaMutation()
  const { mutate: updateDilemma, isPending: updateDilemmaIsPending } = useUpdateDilemmaMutation()

  const onSubmit = form.handleSubmit(async (values) => {
    updateDilemma(
      { dilemmaId: dilemma.id, payload: values },
      {
        onSuccess: () => {
          form.reset(values)
          toast.success('Dilemme mis à jour')
        },
      }
    )
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
          <FormItem>
            <FormLabel>ID</FormLabel>
            <Input value={dilemma.id} disabled />
          </FormItem>
          <FormItem>
            <FormLabel>Auteur</FormLabel>
            <Input value={String(dilemma.author?.username || dilemma.anonymousUsername)} disabled />
          </FormItem>
          <div className="grid grid-cols-2 gap-4">
            <FormItem>
              <FormLabel>Date de création</FormLabel>
              <Input value={new Date(dilemma.createdAt).toLocaleString()} disabled />
            </FormItem>
            <FormItem>
              <FormLabel>Dernière modification</FormLabel>
              <Input value={new Date(dilemma.updatedAt).toLocaleString()} disabled />
            </FormItem>
          </div>
          <div className="flex items-center gap-2 self-end">
            <Button
              type="button"
              variant={dilemma.isApproved ? 'destructive' : 'success'}
              onClick={() =>
                toggleApprove(dilemma.id, { onSuccess: () => toast.success('Dilemme approuvé') })
              }
              disabled={toggleApproveIsPending}
            >
              {dilemma.isApproved ? 'Désapprouver' : 'Approuver'}
            </Button>
            <Button
              type="submit"
              className="w-fit"
              disabled={!form.formState.isDirty || updateDilemmaIsPending}
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
