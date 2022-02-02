import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { useIssue } from '@/hooks/issue'
import { useIssueStatusList } from '@/hooks/issueStatus'
import { Button, Space, Table, LoadingOverlay, Group } from '@mantine/core'
import dayjs from 'dayjs'
import Link from 'next/link'
import { getUrlParam } from '@/libs/libs'

const IssueDetailPage: NextPage = () => {
    const router = useRouter()
    const { getItem } = useIssue()
    const { data: issue, error} = getItem(Number(getUrlParam('id')))
    // 課題ステータス
    const { data: issueStatus, error: statusError } = useIssueStatusList()

    const Content = () => {
        if (error || statusError) return <div>エラーが発生しました</div>
        if (!issue || !issueStatus) return <LoadingOverlay visible={true} />

        return (
            <>
            <article>
                <Table verticalSpacing="xs">
                    <tbody>
                    <tr>
                        <td width={100}>ID</td>
                        <td>{issue.id}</td>
                    </tr>
                    <tr>
                        <td>タイトル</td>
                        <td>{issue.title}</td>
                    </tr>
                    <tr>
                        <td>内容</td>
                        <td style={{whiteSpace: 'pre-wrap'}}>{issue.body}</td>
                    </tr>
                    <tr>
                        <td>状態</td>
                        <td>{issueStatus[issue.status_id]?.label}</td>
                    </tr>
                    <tr>
                        <td>担当者</td>
                        <td>{issue.user?.name || '未設定'}</td>
                    </tr>
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
            </article>
            <Space h="sm" />
            <Group spacing="xs">
                <Link href={{
                    pathname: '/issues/edit/',
                    query: { id: issue.id },
                }}>
                    <Button variant="outline" component="a">編集</Button>
                </Link>
                <Button variant="light" color="gray" onClick={() => router.back()}>戻る</Button>
            </Group>
            </>
        )
    }

    return (
        <Layout title="課題詳細">
            <Content />
        </Layout>
    )
}

export default IssueDetailPage
