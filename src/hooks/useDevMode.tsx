export const useDevMode = () => {
    // @ts-ignore
    return import.meta.env?.DEV;
};
