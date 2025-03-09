export const useFrameDetection = () => {
    return window === window.parent ? false : true;
};
