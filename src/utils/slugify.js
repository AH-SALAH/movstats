export let slugify = (slug='') => encodeURI(slug?.replace(/(\s|\/|\\)+/gi, '_'));
