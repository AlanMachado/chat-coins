export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('jwt');
        if (serializedState === null) {
            return undefined;
        }

        return serializedState;

    } catch (e) {
        console.log('No cookies for you!!', e);
        return undefined;
    }
}


export const saveState = (state) => {
    try {
        localStorage.setItem('jwt', state);
    } catch (error) {
        console.log("We couldn't save your cookies", error);
    }
};