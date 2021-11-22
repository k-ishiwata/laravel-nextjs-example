import React from 'react'
import { useRouter } from 'next/router'
import { Issue, IssueCreate } from '@/types/Issue'
import { InputWrapper, Input, Textarea, Button, Space, Select, Grid, Col } from '@mantine/core'
import { status } from '@/const'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import UserSelectList from '@/components/users/SelectList'

type Props = {
    issue: Issue|IssueCreate,
    children?: React.ReactNode,
    submitAction: (issue: Issue) => Promise<void>
}

const IssueForm: React.VFC<Props> = ({
    issue,
    submitAction,
    children
}) => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, control } = useForm<Issue>()

    const onSubmit: SubmitHandler<Issue> = data => {
        const updateData: Issue = {...issue, ...data}
        return submitAction(updateData)
    }

    // 状態セレクト用の配列を作る
    const selectStatus = status.slice(1).map(item => {
        return {
            value: String(item.value),
            label: item.label
        }
    })

    // 状態セレクトのバリデーションパターン
    const validateStatusReg = new RegExp(
        selectStatus.reduce((prev, current, index) => {
            return prev += (index === 0 ? '' : '|') + current.value
        }, '')
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputWrapper
                id="input-title"
                required
                label="タイトル"
                error={errors.title?.message}
            >
                <Input
                    defaultValue={issue.title}
                    {...register('title', {
                        required: "必ず入力してください。",
                        maxLength: {
                            value: 255,
                            message: "255文字以内で入力してください。"
                        }
                    })}
                    invalid={errors.title !== undefined}
                />
            </InputWrapper>
            <Space />
            <Textarea
                label="内容"
                required
                minRows={6}
                defaultValue={issue.body}
                {...register('body', {
                    maxLength: {
                        value: 1000,
                        message: "1000文字以内で入力してください。"
                    }
                })}
                error={errors.body?.message}
            />
            <Space />
            <Grid>
                <Col span={6}>
                    <Controller
                        name="status"
                        control={control}
                        rules={{
                            required: "必須です",
                            pattern: {
                                value: validateStatusReg,
                                message: "項目から選択してください。"
                            }
                        }}
                        defaultValue={issue.status}
                        render={({ field: {ref, onChange} }) => (
                            <Select
                                ref={ref}
                                onChange={onChange}
                                label="状態"
                                required
                                data={selectStatus}
                                defaultValue={String(issue.status)}
                                error={errors.status?.message}
                            />
                        )}
                    />
                </Col>
                <Col span={6}>
                    <UserSelectList
                        control={control}
                        selectedId={issue.user_id}
                        errorMessage={errors.user_id?.message}
                    />
                </Col>
            </Grid>
            <Space />
            { children }
            <Button type="submit">保存</Button>
            <Button variant="light" color="gray" onClick={() => router.back()}>戻る</Button>
        </form>
    )
}

export default IssueForm
