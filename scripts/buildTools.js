import path from 'path';

const __dirname = import.meta.dirname;

export const resolvePath = (pathname) => {
    return path.resolve(__dirname, pathname);
};

export const uniqueValues = (value, index, self) => {
    return self.indexOf(value) === index;
};
