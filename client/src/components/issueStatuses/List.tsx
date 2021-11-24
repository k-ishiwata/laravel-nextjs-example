import React from 'react'
import { Table, Button, Group, ColorSwatch, useMantineTheme } from '@mantine/core'
import dayjs from 'dayjs'
import { IssueStatus } from '@/types/IssueStatus'

type Props = {
    data: IssueStatus[]
    handleOpenModal: (editId: number|null) => void
    handleDelete: (issueStatus: IssueStatus) => void
}

const IssueStatusList: React.VFC<Props> = ({
   data,
   handleOpenModal,
   handleDelete
}) => {
    const theme = useMantineTheme()

    return (
        <div>
            <Table striped highlightOnHover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>カラー</th>
                    <th>ラベル</th>
                    <th>編集日</th>
                    <th>登録日</th>
                    <th>アクション</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map(issueStatus => (
                        <tr key={issueStatus.id}>
                            <td width={50}>
                                {('00000' + issueStatus.id).slice(-5)}
                            </td>
                            <td width={70}>
                                <ColorSwatch color={theme.colors[issueStatus.color][6]} />
                            </td>
                            <td>{issueStatus.label}</td>
                            <td width={80}>{dayjs(issueStatus.updated_at).format('YYYY/MM/DD')}</td>
                            <td width={80}>{dayjs(issueStatus.created_at).format('YYYY/MM/DD')}</td>
                            <td width={150}>
                                <Group spacing="xs">
                                    <Button variant="outline" size="xs" onClick={() => handleOpenModal(issueStatus.id)}>編集</Button>
                                    <Button color="red" size="xs" onClick={() => handleDelete(issueStatus)}>削除</Button>
                                </Group>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    )
}

export default IssueStatusList
