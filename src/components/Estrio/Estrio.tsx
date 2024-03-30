import React from 'react'

export interface EstrioProps {
    name: string,
    acceptedFileTypes?: string,
    inputProps?: any,
    dataTestId?: string,
}

const Estrio = ({
    name,
    acceptedFileTypes='.*',
    inputProps={},
    dataTestId,
}: EstrioProps) => {
    return <input type='file' accept={acceptedFileTypes} name={name} {...inputProps} style={{ display: 'none' }} data-testid={dataTestId}></input>
}

export default Estrio
