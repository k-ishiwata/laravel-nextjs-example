import React from 'react'
import { Issue } from '@/types/Issue'
import { Loader, Select } from '@mantine/core'
import { useIssueStatusList } from '@/hooks/issueStatus'
import { Controller, Control } from 'react-hook-form'
import type { SelectItem } from '@mantine/core'

type Props = {
    control: Control<Issue>
    selectedId: number|undefined
    errorMessage: string|undefined
}

/**
 * 課題状態選択セレクトボックス
 * @param control
 * @param selectedId
 * @param errorMessage
 * @constructor
 */
const IssueStatusSelectList: React.VFC<Props> = ({
    control,
    selectedId,
    errorMessage
}) => {
    const { data, error } = useIssueStatusList()

    if (error) return <div>エラーが発生しました</div>
    if (!data) return <Loader />

    // コンポーネント用にvalue,label配列にする
    const selectData: SelectItem[] = Object.keys(data).map((index) => {
        return {
            value: index,
            label: data[Number(index)].label
        }
    })

    return (
        <Controller
            name="status_id"
            control={control}
            defaultValue={selectedId}
            render={({ field: {ref, onChange} }) => (
                <Select
                    ref={ref}
                    onChange={onChange}
                    label="担当"
                    required
                    data={selectData}
                    defaultValue={String(selectedId)}
                    error={errorMessage}
                />
            )}
        />
    )
}

export default IssueStatusSelectList
