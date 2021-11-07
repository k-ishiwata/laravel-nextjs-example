import React from 'react'
import { useRouter } from 'next/router'
import { Issue, IssueCreate } from '@/types/Issue'
import { InputWrapper, Input, Textarea, Button, Space, Select } from '@mantine/core'
import { status } from '@/const'

type Props = {
    handleSubmit: React.FormEventHandler<HTMLFormElement>,
    issue: Issue|IssueCreate,
    children?: React.ReactNode
}

const IssueForm: React.VFC<Props> = ({
    issue,
    handleSubmit,
    children
}) => {
    const router = useRouter()

    // セレクトボックス用の配列を作る
    const selectStatus = status.slice(1).map(item => {
        return {
            value: String(item.value),
            label: item.label
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <InputWrapper
                id="input-title"
                required
                label="タイトル"
            >
                <Input
                    id="input-title"
                    defaultValue={issue.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => issue.title = e.target.value}
                />
            </InputWrapper>
            <Space />
            <Textarea
                label="内容"
                required
                minRows={6}
                defaultValue={issue.body}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => issue.body = e.target.value}
            />
            <Space />
            <Select
                label="状態"
                required
                data={selectStatus}
                defaultValue={String(issue.status)}
                onChange={(e) => issue.status = Number(e)}
            />
            <Space />
            { children }
            <Button type="submit">保存</Button>
            <Button variant="light" color="gray" onClick={() => router.back()}>戻る</Button>
        </form>
    )
}

export default IssueForm
