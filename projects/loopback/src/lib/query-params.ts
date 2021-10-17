
function isNumeric(num) {
    return !isNaN(num);
}

// convertie l'object en queryParams comme dans loopback
export function toQueryParams(name: string, object: any, unique = true) {
    const items = [];
    assembleQueryParams(items, '', object);
    return (unique ? '?' : '') + items.map((x) => `${name}${x}`).join('&');
}

function assembleQueryParams(
    items: string[],
    previouskeys: string,
    object: any,
): string[] {
    if (
        typeof object === 'boolean' ||
        typeof object === 'number' ||
        typeof object === 'string'
    ) {
        const value = `=${object}`;
        items.push(previouskeys + value);
    } else if (object instanceof Array) {
        throw new Error('TOP LEVEL ARRAY NOT NOT ');
    } else if (typeof object === 'object') {
        Object.entries(object).forEach(([k, v]) => {
            if (
                typeof v === 'boolean' ||
                typeof v === 'number' ||
                typeof v === 'string'
            ) {
                let value = `=${v}`;
                // si on nest pas dans un array
                if (!isNumeric(k)) {
                    value = `[${k}]` + value;
                }
                items.push(previouskeys + value);
            } else if (v instanceof Array) {
                if (v.length > 0) {
                    // previouskeys += `[${k}]`;
                    v.forEach((va, index) => {
                        items = assembleQueryParams(
                            items,
                            previouskeys + `[${k}]` + `[${index}]`,
                            va,
                        );
                    });
                }
            } else if (typeof v === 'object') {
                items = assembleQueryParams(items, previouskeys + `[${k}]`, v);
            }
        });
    }
    return items;
}
