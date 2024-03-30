import { render } from '@testing-library/react'
import React from 'react'

import Estrio, { EstrioProps } from './Estrio'

describe('Estrio', () => {
    let props: EstrioProps

    beforeEach(() => {
        props = {
            name: 'estrio-reference-1'
        }
    })

    const renderComponent = () => render(<Estrio {...props} />)

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
