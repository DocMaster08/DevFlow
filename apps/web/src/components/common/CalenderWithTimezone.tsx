import { useEffect, useState } from "react"
import { Calendar } from "../ui/calendar"

export function CalendarWithTimezone({...props}) {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [timeZone, setTimeZone] = useState<string | undefined>(undefined)

    useEffect(() => {
        setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    }, [])

    return (
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            timeZone={timeZone}
            {...props}
        />
    )
}