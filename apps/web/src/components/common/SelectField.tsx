import { Controller, type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface SelectFieldProps<TFieldValues extends FieldValues> {
    form: UseFormReturn<TFieldValues>
    name: FieldPath<TFieldValues>
    placeholder: string
    selectItems: {label:string, value:string}[]
}

function SelectField<TFieldValues extends FieldValues>({ form, name, placeholder, selectItems }: SelectFieldProps<TFieldValues>) {
    return (
        <Controller
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{name}</FieldLabel>
                    <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger
                            id={name}
                            aria-invalid={fieldState.invalid}
                            className="min-w-30"
                        >
                            <SelectValue placeholder={placeholder}/>
                        </SelectTrigger>
                        <SelectContent position='popper'>
                            {selectItems.map(item => <SelectItem value={item.value}>{item.label}</SelectItem>)}                        
                        </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    )
}

export default SelectField