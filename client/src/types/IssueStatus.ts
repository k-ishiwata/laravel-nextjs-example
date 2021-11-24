export type IssueStatus = {
    id: number
    label: string
    color: string
    created_at: Date
    updated_at: Date
}

export type IssueStatusCreate = {
    label: string
    color: string
}
