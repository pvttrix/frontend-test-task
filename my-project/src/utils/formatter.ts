export const formatPrice = (price: number, currency = 'GBP'): string => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency
    }).format(price)
}

export const truncate = (text: string, length: number): string => {
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
}