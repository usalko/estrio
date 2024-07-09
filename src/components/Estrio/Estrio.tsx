import React from 'react'

export interface EstrioProps {
    name: string,
    acceptedFileTypes?: string,
    inputProps?: any,
    dataTestId?: string,
}

class GetCommand<T> {
    url: string

    constructor(url: string) {
        this.url = url
    }

    execute(): Promise<T> {
        return fetch(this.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<T>
            })
    }
}

class ListCommand<T> {
    url: string

    constructor(url: string) {
        this.url = url
    }

    execute(): Promise<T> {
        return fetch(this.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<T>
            })
    }
}

class PutCommand<T> {
    url: string

    constructor(url: string) {
        this.url = url
    }

    execute(): Promise<T> {
        return fetch(this.url, {
            method: 'PUT',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<T>
            })
    }
}

const Estrio = ({
    name,
    acceptedFileTypes = '.*',
    inputProps = {},
    dataTestId,
}: EstrioProps) => {
    return <input type='file' accept={acceptedFileTypes} name={name} {...inputProps} style={{ display: 'none' }} data-testid={dataTestId}></input>
}

// GET
// LIST
// PUT

export default Estrio
