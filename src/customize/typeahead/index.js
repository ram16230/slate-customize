
export const subObjectMatcher = ({ options, includes }) => {
    // $FlowIgnore
    const list = Array.isArray(options) ? options : (Object.values(options));
    const check = includes ? includes : undefined;

    return (t) => {
        const text = t.replace("/", "");
        const matches = [];
        const substrRegex = new RegExp(text, 'i');
        for (const item of list) {
            if (item) {
                if (typeof item === 'object') {
                    if (check) {
                        for (const key of check) {
                            const value = item[key];
                            if (substrRegex.test(String(value))) {
                                matches.push(item);
                                break;
                            }
                        }
                    } else {
                        for (const key in item) {
                            const value = item[key];
                            if (substrRegex.test(String(value))) {
                                matches.push(item);
                                break;
                            }
                        }
                    }
                } else {
                    if (substrRegex.test(String(item))) {
                        matches.push(item);
                    }
                }
            }
        }
        return matches;
    }
};