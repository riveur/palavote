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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { translateRole } from '@/features/auth/content/role'
import type { User } from '@/features/auth/types'
import { cn } from '@/lib/utils'
import { useUpdateUserMutation } from '../mutations'

const schema = z.object({
  role: z.enum(['ADMIN', 'USER']),
})

export type FormSchema = z.infer<typeof schema>

interface UsersTableExpandedRowProps extends React.ComponentProps<'div'> {
  row: Row<User>
}

export function UsersTableExpandedRow({ row, className, ...props }: UsersTableExpandedRowProps) {
  const { original: user } = row

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: user.role,
    },
  })

  const { mutate: updateUser, isPending: updateUserIsPending } = useUpdateUserMutation()

  const onSubmit = form.handleSubmit(async (values) => {
    updateUser(
      { userId: user.id, payload: values },
      {
        onSuccess: () => {
          form.reset(values)
          toast.success('Utilisateur mis à jour')
        },
      }
    )
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <div className="grid grid-cols-2 gap-6">
            <FormItem>
              <FormLabel>ID</FormLabel>
              <Input value={user.id} disabled />
            </FormItem>
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <Input value={user.username} disabled />
            </FormItem>
          </div>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rôle</FormLabel>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(['USER', 'ADMIN'] as const).map((value) => (
                      <SelectItem key={value} value={value}>
                        {translateRole(value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Utilisateur anonyme ?</FormLabel>
            <Input value={user.isAnonymous ? 'Oui' : 'Non'} disabled />
          </FormItem>
          <div className="grid grid-cols-2 gap-6">
            <FormItem>
              <FormLabel>Date de création</FormLabel>
              <Input value={new Date(user.createdAt).toLocaleString()} disabled />
            </FormItem>
            <FormItem>
              <FormLabel>Dernière modification</FormLabel>
              <Input
                value={user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'Inconnu'}
                disabled
              />
            </FormItem>
          </div>
          <div className="flex items-center gap-2 self-end">
            <Button
              type="submit"
              className="w-fit"
              disabled={!form.formState.isDirty || updateUserIsPending}
            >
              Sauvegarder
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
