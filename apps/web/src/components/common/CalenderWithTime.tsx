import { Clock2Icon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useState } from "react"
import { Separator } from "../ui/separator"

interface CalendarWithTimeProps {
    value?: string
    onChange: (date?: string) => void
}

export function CalendarWithTime({ value, onChange }: CalendarWithTimeProps) {
    const [date, setDate] = useState<Date | undefined>(
        value ? new Date(value) : undefined
    )
    const [time, setTime] = useState(
        value ? new Date(value).toTimeString().slice(0, 8) : "10:30:00"
    )

    const emitCombined = (newDate: Date | undefined, newTime: string) => {
        if (!newDate) return
        const [hours, minutes, seconds] = newTime.split(":").map(Number)
        const merged = new Date(newDate)
        merged.setHours(hours, minutes, seconds ?? 0, 0)
        onChange(merged.toISOString())
    }

    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate)
        emitCombined(newDate, time)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value)
        emitCombined(date, e.target.value)
    }

    return (
        <div className="self-center flex flex-col gap-5 p-4">
            <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="p-0"
            />

            <Separator/>

            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="due-time">Due Time</FieldLabel>
                    <InputGroup>
                        <InputGroupInput
                            id="due-time"
                            type="time"
                            step="1"
                            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            value={time}
                            onChange={handleTimeChange}
                        />
                        <InputGroupAddon>
                            <Clock2Icon className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
            </FieldGroup>
        </div>

    )
}
