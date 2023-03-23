export interface profile {
    name: string,
    email: string,
    slug: string,
    image?: {
        id: string,
        url: string,
        width: string
    },
    description?: string
    message?: string,
}
