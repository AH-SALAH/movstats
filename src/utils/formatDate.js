export let formatedDate = (date=Date.now()) => {
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