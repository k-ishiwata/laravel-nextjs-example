import React from 'react'
import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { useIssue } from '@/hooks/issue'
import IssueForm from '@/components/issues/Form'
import { Button, Space, LoadingOverlay, Table } from '@mantine/core'
import { getUrlParam } from '@/libs/libs'
import dayjs from 'dayjs'

const IssueEditPage: NextPage = () => {
    const { updateAction, deleteAction, getItem } = useIssue()
    const { data: issue, error } = getItem(Number(getUrlParam('id')))

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (issue) updateAction(issue)
    }

    const handleDelete = () => {
        const result = window.confirm("本当に削除しますか？")
        if (!result) return
        if (issue) deleteAction(issue)
    }

    if (error) return <div>エラーが発生しました</div>
    if (!issue) return <LoadingOverlay visible={true} />
    return (
        <Layout title="課題編集">
            <p>ID: {issue.id}</p>
            <Space />
            <div style={{textAlign: "right", marginTop: -50}}>
                <Button color="red" onClick={handleDelete}>削除</Button>
            </div>
            <IssueForm handleSubmit={handleSubmit} issue={issue}>
                <Table>
                    <tbody>
                    <tr>
                        <td>登録日</td>
                        <td>{ dayjs(issue.created_at).format('YYYY年MM月DD日 HH:mm') }</td>
                    </tr>
                    <tr>
                        <td>更新日</td>
                        <td>{ dayjs(issue.updated_at).format('YYYY年MM月DD日 HH:mm') }</td>
                    </tr>
                    </tbody>
                </Table>
                <Space />
            </IssueForm>
        </Layout>
    )
}

export default IssueEditPage
