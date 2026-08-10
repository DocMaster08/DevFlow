export function formatDueDate(date: string) {
    const today = new Date()
    const givenDate = new Date(date)

    const diff = getTimeDifference(today, givenDate)

    if (diff.days >= 60) return `Due in ${Math.floor(diff.days / 30)} Months`
    if (diff.days >= 30) return "Due Next Month";
    if (diff.days >= 14) return `Due in ${Math.floor(diff.days / 7)} Weeks`
    if (diff.days >= 7) return "Due next week";
    if (diff.days >= 2) return `Due in ${diff.days} Days`
    if (diff.days === 1) return "Due Tomorrow"
    if (diff.hours > 3) return "Due Today"
    if (diff.hours > 0) return `Due in ${diff.hours} Hour${diff.hours > 1 ? 's' : ''}`
    if (diff.minutes > 0) return `Due in ${diff.minutes} Minute${diff.minutes > 1 ? 's' : ''}`
    if (diff.seconds > 0) return `Due in ${diff.seconds} Seconds${diff.seconds > 1 ? 's' : ''}`
    return "Overdue"

}

export function formatDatetime(date: string) {
    const today = new Date()
    const givenDate = new Date(date)

    const diff = getTimeDifference(givenDate, today)


    if (diff.days >= 60) return `${Math.floor(diff.days / 30)} Months Ago`
    if (diff.days >= 30) return "Last Month";
    if (diff.days >= 14) return `${Math.floor(diff.days / 7)} Weeks Ago`
    if (diff.days >= 7) return "Last Week";
    if (diff.days >= 2) return `${diff.days} Days Ago`
    if (diff.days === 1) return "Yesterday"
    if (diff.hours > 3) return "Today"
    if (diff.hours > 0) return `${diff.hours} Hour${diff.hours > 1 ? 's' : ''} Ago`
    if (diff.minutes > 0) return `${diff.minutes} Minute${diff.minutes > 1 ? 's' : ''} Ago`
    return "Now"
}

function getTimeDifference(start: Date, end: Date) {
    const ms = end.getTime() - start.getTime();

    return {
        days: Math.floor(ms / (1000 * 60 * 60 * 24)),
        hours: Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((ms % (1000 * 60)) / 1000)
    };
}