import { Clock2Icon } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,    
    InputGroupInput,
} from "@/components/ui/input-group"
import { useEffect, useState } from "react"

interface CalendarWithTimeProps {
    value?: string
    onChange: (date?: string) => void
}

export function CalendarWithTime({ value, onChange }: CalendarWithTimeProps) {
    
    const [date, setDate] = useState(new Date(value))
    const [time, setTime] = useState('')

    useEffect(() => {
        onChange(date.toISOString())
    }, [date])

    return (
        <Card size="sm" className="mx-auto w-fit">
            <CardContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0"
                />
            </CardContent>
            <CardFooter className="border-t bg-card">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="due-time">Due Time</FieldLabel>
                        <InputGroup>
                            <InputGroupInput
                                id="due-time"
                                type="time"
                                step="1"
                                defaultValue="10:30:00"
                                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                           />
                            <InputGroupAddon>
                                <Clock2Icon className="text-muted-foreground" />
                            </InputGroupAddon>
                        </InputGroup>
                    </Field>
                </FieldGroup>
            </CardFooter>
        </Card>
    )
}
