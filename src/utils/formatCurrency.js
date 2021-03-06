export let formatCurrency = (currency = 'USD') => new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
    notation: "compact",
    compactDisplay: "short"
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});