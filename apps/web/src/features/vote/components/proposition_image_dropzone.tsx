import { UploadIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useUploadPropositionImageMutation } from '../mutations'

interface PropositionImageDropzoneProps extends Omit<React.ComponentProps<typeof Card>, 'onDrop'> {
  onDropFile?: (file: File) => void
  url?: string
  onUrlChange?: (url: string) => void
}

export function PropositionImageDropzone({
  onDropFile,
  url: _url = '',
  onUrlChange,
  className,
  ...props
}: PropositionImageDropzoneProps) {
  const [image, setImage] = useState<string | null>(null)
  const [url, setUrl] = useState<string>(_url)

  useEffect(() => {
    setUrl(_url)
  }, [_url])

  const mutation = useUploadPropositionImageMutation()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      setImage(URL.createObjectURL(file))
      onDropFile?.(file)
      mutation.mutate(acceptedFiles[0], {
        onSuccess: (data) => {
          setUrl?.(data.url)
          setImage(null)
          onUrlChange?.(data.url)
        },
      })
    },
    [onDropFile]
  )

  const handleClear = () => {
    setImage(null)
    setUrl('')
    onUrlChange?.('')
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    disabled: mutation.isPending,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
    onDrop: onDrop,
  })

  return (
    <Card
      className={cn(
        'group relative border-dashed data-[drag=true]:border-solid data-[active=true]:hover:opacity-80 data-[pending=true]:animate-pulse transition-opacity data-[active=false]:hover:bg-muted/80 overflow-hidden',
        className
      )}
      data-pending={mutation.isPending}
      data-active={!!image || !!url}
      data-drag={isDragActive}
      {...props}
    >
      {url && (
        <Button
          type="button"
          className="z-20 absolute bottom-4 right-4 w-fit rounded-full"
          variant="outline"
          onClick={handleClear}
        >
          Effacer
        </Button>
      )}
      {(image || url) && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image || url})` }}
        />
      )}
      <label
        {...getRootProps()}
        className="z-10 absolute inset-0 flex flex-col gap-4 items-center justify-center cursor-pointer group-data-[active=true]:opacity-0"
      >
        <UploadIcon className="size-12" />
        <span>Glissez-déposez une image</span>
      </label>
      <Input {...getInputProps()} accept="image/png, image/jpeg" type="file" className="hidden" />
    </Card>
  )
}
