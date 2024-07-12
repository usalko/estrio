import { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import EstrioUploadButton from './EstrioUploadButton'

export default {
    component: EstrioUploadButton,
} as Meta

export const Primary: StoryObj = (args) => <EstrioUploadButton {...args} />
Primary.args = {
    label: 'EstrioUploadButton',
    primary: true,
}