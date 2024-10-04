export const useEnv = () => {
    return {
        RAINBOWKIT_PROJECT_ID: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID as string,
    };
};