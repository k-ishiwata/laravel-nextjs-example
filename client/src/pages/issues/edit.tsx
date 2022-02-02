import React from 'react'
import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { useIssue } from '@/hooks/issue'
import IssueForm from '@/components/issues/Form'
import { Button, Space, LoadingOverlay, Table } from '@mantine/core'
import { getUrlParam } from '@/libs/libs'
import dayjs from 'dayjs'
import { Issue } from '@/types/Issue'
import { useConfirmModal } from '@/hooks/confirmModal'

const IssueEditPage: NextPage = () => {
    const { updateAction, deleteAction, getItem } = useIssue()
    const { data: issue, error } = getItem(Number(getUrlParam('id')))
    // 確認モーダル
    const { deleteModal } = useConfirmModal<Issue>(deleteAction)

    const Content = () => {
        if (error) return <div>エラーが発生しました</div>
        if (!issue) return <LoadingOverlay visible={true} />
        return (
            <>
                <p>ID: {issue.id}</p>
                <Space h="md" />
                <div style={{textAlign: "right", marginTop: -50}}>
                    <Button color="red" onClick={() => deleteModal(issue)}>削除</Button>
                </div>
                <IssueForm submitAction={updateAction} issue={issue}>
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
                    <Space h="md" />
                </IssueForm>
            </>
        )
    }

    return (
        <Layout title="課題編集">
            <Content />
        </Layout>
    )
}

export default IssueEditPage
