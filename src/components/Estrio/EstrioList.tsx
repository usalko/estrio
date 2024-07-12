import React from 'react'

export interface EstrioListProps {
    name: string,
    acceptedFileTypes?: string,
    inputProps?: any,
    dataTestId?: string,
}

const EstrioList = ({
    name,
    acceptedFileTypes = '.*',
    inputProps = {},
    dataTestId,
}: EstrioListProps) => {
    return <div></div>
}

export default EstrioList
