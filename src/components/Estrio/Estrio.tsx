import React from 'react'

export interface EstrioProps {
    name: string,
    acceptedFileTypes?: string,
    inputProps?: any
}

const Estrio = ({
    name,
    acceptedFileTypes='.*',
    inputProps={},
}: EstrioProps) => {
    return <input type='file' accept={acceptedFileTypes} name={name} {...inputProps} style={{ display: 'none' }}></input>
}

export default Estrio
