import { Text } from '@mantine/core'
import { useModals } from '@mantine/modals'

/**
 * 確認モーダル
 * @param confirmAcrion
 */
export const useConfirmModal = <T extends { id?: number }>(confirmAcrion: (item: T) => Promise<void>) => {
    const modals = useModals()

    const deleteModal = (item: T) => {
        modals.openConfirmModal(
            {
                title: '削除確認',
                children: (
                    <Text size="sm">ID:{item.id}を削除しますか？</Text>
                ),
                labels: { confirm: '削除する', cancel: '閉じる' },
                confirmProps: { color: 'red' },
                onConfirm: () => confirmAcrion(item)
            })
    }

    return {
        deleteModal
    }
}
