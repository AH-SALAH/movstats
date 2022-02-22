export let formatMins = time => {
    let h = Math.floor(time / 60);
    let m = Math.round(time % 60);
    return `${h}h ${m}m`;
};