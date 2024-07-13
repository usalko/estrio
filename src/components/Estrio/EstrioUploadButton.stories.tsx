import { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import EstrioUploadButton from './EstrioUploadButton'

export default {
    component: EstrioUploadButton,
} as Meta

export const Primary: StoryObj = (args) => <EstrioUploadButton {...args} />
Primary.args = {
    label: 'Upload file to S3 storage',
    primary: true,
}

export const Secondary: StoryObj = (args) => <EstrioUploadButton {...args} />
Secondary.args = {
    label: 'Upload zip file to S3 storage',
    acceptedFileTypes: '*.zip',
}