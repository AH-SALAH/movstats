export let formatedDate = (date = Date.now()) => {
    if (!date) return false;
    return new Date(date)
        .toLocaleDateString(undefined,
            {
                weekday: undefined,
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }
        );
};