import { Pager } from './Pager'

export type Issue = {
    id: number
    title: string
    body: string
    status: number
    created_at: Date
    updated_at: Date
}

export type IssueCreate = {
    title: string
    body: string
    status: number
}

export type IssuePager = Pager & {
    data: Issue[]
}
