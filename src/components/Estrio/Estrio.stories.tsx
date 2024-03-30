import { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import Estrio from './Estrio'

export default {
    component: Estrio,
} as Meta

export const Primary: StoryObj = (args) => <Estrio {...args} />
Primary.args = {
    label: 'Estrio',
    primary: true,
}