import { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import EstrioList from './EstrioList'

export default {
    component: EstrioList,
} as Meta

export const Primary: StoryObj = (args) => <EstrioList {...args} />
Primary.args = {
    label: 'EstrioList',
    primary: true,
}