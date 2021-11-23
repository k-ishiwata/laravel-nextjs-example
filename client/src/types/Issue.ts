import { Pager } from './Pager'

type User = {
    id: number
    name: string
}

export type Issue = {
    id: number
    title: string
    body: string
    status_id: number
    user_id?: number
    user?: User
    created_at: Date
    updated_at: Date
}

export type IssueCreate = {
    title: string
    body: string
    status_id: number
    user_id?: number
}

export type IssuePager = Pager & {
    data: Issue[]
}
