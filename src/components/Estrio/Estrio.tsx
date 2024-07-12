
export interface EstrioCommand<T> {
    url: string
}

class GetCommand<T> implements EstrioCommand<T> {
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

class ListCommand<T> implements EstrioCommand<T> {
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

class PutCommand<T> implements EstrioCommand<T> {
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

