export function removeUndefined(data: Object) {
    return Object.fromEntries(
        Object.entries(data)
            .filter(([_, value]) => value !== undefined)
    )
}