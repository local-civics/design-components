// A utility for debouncing search
export const debounce = (func: (search: string) => void, delay?: number) => {
    let timeout: NodeJS.Timeout;
    return (search: string) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(search), delay || 300);
    };
};