import React from 'react'

export interface EstrioDownloadButtonProps {
    name: string,
    acceptedFileTypes?: string,
    inputProps?: any,
    dataTestId?: string,
}

const EstrioDownloadButton = ({
    name,
    acceptedFileTypes = '.*',
    inputProps = {},
    dataTestId,
}: EstrioDownloadButtonProps) => {
    return <button></button>
}

export default EstrioDownloadButton
