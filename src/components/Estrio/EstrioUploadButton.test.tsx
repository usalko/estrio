import { render } from '@testing-library/react'
import React from 'react'

import EstrioUploadButton, { EstrioUploadButtonProps } from './EstrioUploadButton'

describe('EstrioUploadButton', () => {
    let props: EstrioUploadButtonProps

    beforeEach(() => {
        props = {
            name: 'estrio-reference-1',
            dataTestId: 'test-component',
        }
    })

    const renderComponent = () => render(<EstrioUploadButton {...props} />)

    it('should have name property with default props', () => {
        const { getByTestId } = renderComponent()

        const testComponent = getByTestId('test-component')

        expect(testComponent).toHaveProperty('name', 'estrio-reference-1')
    })

    it('should have name property with theme set as secondary', () => {
        props.name = 'estrio-reference-2'
        const { getByTestId } = renderComponent()

        const testComponent = getByTestId('test-component')

        expect(testComponent).toHaveProperty('name', 'estrio-reference-2')
    })
})
