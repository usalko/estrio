import { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import EstrioDownloadButton from './EstrioDownloadButton'

export default {
    component: EstrioDownloadButton,
} as Meta

export const Primary: StoryObj = (args) => <EstrioDownloadButton {...args} />
Primary.args = {
    label: 'EstrioDownloadButton',
    primary: true,
}