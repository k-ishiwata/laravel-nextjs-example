import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Issue } from '@/types/Issue'
import { useIssues } from '@/hooks/issue'
import { useIssueStatusList } from '@/hooks/issueStatus'
import { Table, Button, Group, Loader, Pagination, Space, Badge, Anchor } from '@mantine/core'
import dayjs from 'dayjs'
import { getUrlParam } from '@/libs/libs'
import { useConfirmModal } from '@/hooks/confirmModal'

const IssueList = () => {
    const router = useRouter()
    // pageパラメータを取得
    const defaultPage: number = Number(getUrlParam('page')) || 1
    // ページャー用ステート
    const [pageIndex, setPageIndex] = useState<number>(defaultPage)
    // 課題一覧を取得
    const { issues, error, deleteAction } = useIssues(pageIndex)
    // 課題ステータス
    const { data: issueStatus, error: statusError } = useIssueStatusList()
    // 確認モーダル
    const { deleteModal } = useConfirmModal<Issue>(deleteAction)

    const handlePagerClick = (page: number) => {
        setPageIndex(page)
        // アドレスURLの書き換え
        router.push({
            query: { page :page }
        });
    }

    if (error || statusError) return <div>エラーが発生しました</div>
    if (!issues || !issueStatus) return <Loader />

    return (
        <div>
            <Table striped highlightOnHover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>タイトル</th>
                    <th>状態</th>
                    <th>担当者</th>
                    <th>登録日</th>
                    <th>アクション</th>
                </tr>
                </thead>
                <tbody>
                {
                    issues.data.map(issue => (
                        <tr key={issue.id}>
                            <td width={50}>
                                <Link href={{
                                    pathname: '/issues/detail/',
                                    query: { id: issue.id },
                                }}>
                                    <Anchor>{('00000' + issue.id).slice(-5)}</Anchor>
                                </Link>
                            </td>
                            <td>{issue.title}</td>
                            <td width={80}>
                            {
                                issueStatus[issue.status_id]
                                    ? <Badge fullWidth variant="filled" color={issueStatus[issue.status_id]?.color}>
                                        {issueStatus[issue.status_id]?.label}
                                      </Badge>
                                    : ''
                            }
                            </td>
                            <td width={80}>{issue.user?.name || '未設定'}</td>
                            <td width={80}>{dayjs(issue.created_at).format('YYYY/MM/DD')}</td>
                            <td width={140}>
                                <Group spacing="xs">
                                    <Link href={{
                                        pathname: '/issues/edit/',
                                        query: { id: issue.id },
                                    }}>
                                        <Button variant="outline" size="xs" component="a">編集</Button>
                                    </Link>
                                    <Button color="red" size="xs" onClick={() => deleteModal(issue)}>削除</Button>
                                </Group>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
            <Space h="md" />
            <div>
                <Pagination
                    page={pageIndex}
                    onChange={handlePagerClick}
                    total={issues.last_page}
                />
            </div>
        </div>
    )
}

export default IssueList
