import { useState, useEffect } from 'react';

const useExample = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        // Logic to run on component mount or value change
        return () => {
            // Cleanup logic if necessary
        };
    }, [value]);

    const updateValue = (newValue: string) => {
        setValue(newValue);
    };

    return [value, updateValue];
};

export default useExample;