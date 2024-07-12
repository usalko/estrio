import React from 'react'

export interface EstrioUploadButtonProps {
    name: string,
    acceptedFileTypes?: string,
    inputProps?: any,
    dataTestId?: string,
}

const EstrioUploadButton = ({
    name,
    acceptedFileTypes = '.*',
    inputProps = {},
    dataTestId,
}: EstrioUploadButtonProps) => {
    return <input type='file' accept={acceptedFileTypes} name={name} {...inputProps} style={{ display: 'none' }} data-testid={dataTestId}></input>
}

export default EstrioUploadButton
