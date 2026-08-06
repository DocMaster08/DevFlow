import { useState } from 'react'
import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarWithTime } from './CalenderWithTime'
import { datetimeToString } from '@/features/tasks/utils/datetimeToString'

interface CalendarWithTimeFieldProps<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>
    name: FieldPath<TFieldValues>
    placeholder: string
}

function CalendarWithTimeField<TFieldValues extends FieldValues>({ form, name, placeholder }: CalendarWithTimeFieldProps<TFieldValues>) {
    const [open, setOpen] = useState(false)

    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field orientation='responsive' data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{name}</FieldLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline">{field.value ? datetimeToString(field.value) : placeholder}</Button>
                        </PopoverTrigger>
                        <PopoverContent
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    setOpen(false)
                                }
                            }}
                        >
                            <CalendarWithTime value={field.value} onChange={field.onChange} />
                        </PopoverContent>
                    </Popover>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}

export default CalendarWithTimeField