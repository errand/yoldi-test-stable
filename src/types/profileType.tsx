export interface profile {
    name: string,
    email: string,
    slug: string,
    message?: {
        id: string,
        url: string,
        width: string
    },
    description?: string
    image?: string,
}
