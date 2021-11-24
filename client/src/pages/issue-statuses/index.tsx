import React, { useState } from 'react'
import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import IssueStatusList from '@/components/issueStatuses/List'
import { Button, Loader, Modal, Space } from '@mantine/core'
import { useIssueStatuses } from '@/hooks/issueStatus'
import { IssueStatus } from '@/types/IssueStatus'
import IssueStatusForm from '@/components/issueStatuses/Form'

const IssueStatusPage: NextPage = () => {
    const [modalOpened, setModalOpened] = useState(false)
    const [selectIndex, setSelectIndex] = useState<number|null>(null)

    // 課題ステータス一覧
    const { data, error, updateAction, createAction, deleteAction } = useIssueStatuses()

    const handleDelete = (issueStatus: IssueStatus) => {
        const result = window.confirm("本当に削除しますか？")
        if (!result) return
        deleteAction(issueStatus)
    }

    const handleOpenModal = (editId: number|null = null): void => {
        setSelectIndex(editId)
        setModalOpened(true)
    }

    const handleCloseModal = (): void => {
        setSelectIndex(null)
        setModalOpened(false)
    }

    const Content = () => {
        if (error) return <div>エラーが発生しました</div>
        if (!data) return <Loader />

        return (
            <>
                <IssueStatusList
                    data={data}
                    handleOpenModal={handleOpenModal}
                    handleDelete={handleDelete}
                />
                <Modal
                    opened={modalOpened}
                    onClose={handleCloseModal}
                    title={selectIndex ? '編集' : '新規登録'}
                >
                    <IssueStatusForm
                        issueStatus={
                            selectIndex
                                ? data[data.findIndex(i => i.id === selectIndex)]
                                : { label: '', color: 'gray' }
                        }
                        submitAction={selectIndex ? updateAction : createAction}
                        handleClose={handleCloseModal}
                    />
                </Modal>
            </>
        )
    }

    return (
        <Layout title="ステータス">
            <div style={{ textAlign: 'right', marginTop: -50 }}>
                <Button onClick={() => handleOpenModal()}>新規登録</Button>
            </div>
            <Space />
            <Content />
        </Layout>
    )
}

export default IssueStatusPage
