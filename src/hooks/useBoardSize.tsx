import React, { useState } from 'react'

const useBoardSize = () => {
    const [size, setSize] = useState<number>(0);
    const [finalSize, setFinalSize] = useState<number>(3);
    const [isError, setIsError] = useState(false);
    const [isSizeValidated, setIsSizeValidated] = useState(false);


    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value: number = parseInt(e.target.value);
        if (value) {
        setSize(value);
        }
    }

    const handleFinalSizeOnEnterClick = () => {
        if ( size > 2) {
            setFinalSize(size);
            setIsSizeValidated(true);
        }
        else {
            setIsError(true);
            setIsSizeValidated(false);
        }
    }

    // console.log('finalsize in hook: ', finalSize)

    return { size, finalSize, isError, isSizeValidated, handleSizeChange, handleFinalSizeOnEnterClick };
}

export default useBoardSize