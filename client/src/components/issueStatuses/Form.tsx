import React, { useState } from 'react'
import { IssueStatus, IssueStatusCreate } from '@/types/IssueStatus'
import { InputWrapper, Input, Button, Space, ColorSwatch, Group, useMantineTheme } from '@mantine/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CheckIcon } from '@radix-ui/react-icons'

type Props = {
    issueStatus: IssueStatus|IssueStatusCreate,
    submitAction: (issueStatus: IssueStatus, callback?: () => void) => Promise<void>
    handleClose: () => void
}

const IssueStatusForm: React.VFC<Props> = ({
    issueStatus,
    submitAction,
    handleClose
}) => {
    const {register, handleSubmit, formState: { errors }} = useForm<IssueStatus>()

    const [selectColor, setSelectColor] = useState(issueStatus.color || '')

    const theme = useMantineTheme();

    const swatches = Object.keys(theme.colors).map((color) => (
        <ColorSwatch
            key={color}
            color={theme.colors[color][6]}
            style={{color: '#fff', cursor: 'pointer'}}
            onClick={() => setSelectColor(color)}
        >
            {selectColor === color ? <CheckIcon /> : ''}
        </ColorSwatch>
    ));

    const onSubmit: SubmitHandler<IssueStatus> = data => {
        data.color = selectColor
        const updateData = {...issueStatus, ...data}
        return submitAction(updateData, () => {
            handleClose()
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper
                id="input-label"
                required
                label="ラベル"
                error={errors.label?.message}
            >
                <Input
                    defaultValue={issueStatus.label}
                    {...register('label', {
                        required: '必ず入力してください。',
                        maxLength: {
                            value: 10,
                            message: '10文字以内で入力してください。'
                        }
                    })}
                    invalid={errors.label !== undefined}
                />
            </InputWrapper>
            <Space h="sm" />
            <InputWrapper
                id="input-color"
                required
                label="カラー"
                error={errors.color?.message}
            >
                <Group spacing="xs">
                {swatches}
                </Group>
            </InputWrapper>
            <Space h="sm" />
            <Group spacing="xs">
                <Button type="submit">保存</Button>
                <Button variant="light" color="gray" onClick={handleClose}>閉じる</Button>
            </Group>
        </form>
    )
}

export default IssueStatusForm
