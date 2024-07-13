import React, { useRef } from 'react';

export interface EstrioUploadButtonProps {
    /**
     * Name of the component
     */
    name: string,
    /**
     * File types separated by semicolon, as an example *.db;*.png
     */
    acceptedFileTypes?: string,
    /**
     * There is the any additional properties for cover div tag
     */
    inputProps?: any,
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    label?: string;
    /**
     * Optional additional click handler before upload
     */
    beforeUpload?: () => void;
    /**
     * This is the test identity
     */
    dataTestId?: string,
}

/**
 * UI component for user interaction with upload file to s3 storage. 
 */
const EstrioUploadButton = ({
    name,
    acceptedFileTypes = '.*',
    inputProps: additionalProps = {},
    dataTestId,
    label = '',
}: EstrioUploadButtonProps) => {
    const hiddenInputRef = useRef(null)
    const handleClick = () => {
        (hiddenInputRef?.current as any)?.click()
    }
    return <div
        {...additionalProps}>
        {label ? <button onClick={handleClick}>{label}</button> : ''}
        <input
            ref={hiddenInputRef}
            type='file'
            accept={acceptedFileTypes}
            name={name}
            style={{ display: 'none' }}
            data-testid={dataTestId}></input>
    </div>
}

export default EstrioUploadButton
