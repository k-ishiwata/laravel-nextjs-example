import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Issue } from '@/types/Issue'
import { useIssues } from '@/hooks/issue'
import { Table, Button, Group, Loader, Pagination, Space, Badge, Anchor } from '@mantine/core'
import dayjs from 'dayjs'
import { getUrlParam } from '@/libs/libs'
import { status } from '@/const'

const IssueList = () => {
    const router = useRouter()
    // pageパラメータを取得
    const defaultPage: number = Number(getUrlParam('page')) || 1
    // ページャー用ステート
    const [pageIndex, setPageIndex] = useState<number>(defaultPage)
    // 課題一覧を取得
    const { issues, error, deleteAction } = useIssues(pageIndex)

    const handlePagerClick = (page: number) => {
        setPageIndex(page)
        // アドレスURLの書き換え
        router.push({
            query: { page :page }
        });
    }

    const handleDelete = (issue: Issue) => {
        const result = window.confirm("本当に削除しますか？")
        if (!result) return
        deleteAction(issue)
    }

    if (error) return <div>エラーが発生しました</div>
    if (!issues) return <Loader />

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
                                    <Anchor href="#">{('00000' + issue.id).slice(-5)}</Anchor>
                                </Link>
                            </td>
                            <td>{issue.title}</td>
                            <td width={80}><Badge fullWidth variant="filled" color={status[issue.status].color}>
                                {status[issue.status].label}
                            </Badge></td>
                            <td width={80}>{issue.user?.name || '未設定'}</td>
                            <td width={80}>{dayjs(issue.created_at).format('YYYY/MM/DD')}</td>
                            <td width={130}>
                                <Group>
                                    <Link href={{
                                        pathname: '/issues/edit/',
                                        query: { id: issue.id },
                                    }}>
                                        <Button variant="outline" size="xs" component="a">編集</Button>
                                    </Link>
                                    <Button color="red" size="xs" onClick={() => handleDelete(issue)}>削除</Button>
                                </Group>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
            <Space />
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
