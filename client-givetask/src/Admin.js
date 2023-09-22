import { Button, DatePicker, Form, Input, Layout, Modal, Popconfirm, Space, Table, Tag } from "antd"
import { useCallback, useEffect, useMemo, useState } from "react"
import { delWork, download, getWorkInformation, getWorks, publishWork } from "./hooks/request"


const Addition = ({ onReset }) => {
    const [form] = Form.useForm()
    const [open, setOpen] = useState(false);
    const onCancel = useCallback(() => setOpen(false), []);
    const onClick = useCallback(() => setOpen(true), []);
    const onOk = useCallback(() => {
        form.submit()
    }, [])
    const onFinish = useCallback((data) => {
        data.deadline = data.deadline.format("YYYY-MM-DD")
        publishWork(data).then(() => {
            onReset();
            onCancel()
        })
    }, []);
    return (
        <>
            <Button
                onClick={onClick}
            >
                添加
            </Button>
            <Modal
                open={open}
                onCancel={onCancel}
                onOk={onOk}
                title="添加任务"
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="作业名"
                        name="name"
                        rules={[{
                            required: true
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="截止日期"
                        name="deadline"
                        rules={[{
                            required: true
                        }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="comment"
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
const Viewer = ({ data, reload }) => {
    const [open, setOpen] = useState(false);
    const onClick = useCallback(() => setOpen(true))
    const onCancel = useCallback(() => setOpen(false));
    const [information, setInformation] = useState(null);
    const onDownload = useCallback(() => {
        window.open(process.env.REACT_APP_BASE_URL + "\\" + data.id + "\\download")
    }, [data])
    useEffect(() => {
        if (open && !information) {
            getWorkInformation(data.id).then(({ data }) => {
                setInformation(data)
            })
        }
    }, [open])
    const onDelete = useCallback(() => {
        delWork(data.id).finally(() => reload())
    }, [data])
    return (
        <>
            <Modal
                open={open}
                onCancel={onCancel}
                onOk={onCancel}
                title={data.name}
            >
                <Space
                    wrap
                >
                    {!!information && information.map(({ name, id, isFinished }) => (
                        <Tag
                            key={id}
                            color={isFinished ? "#87d068" : "#f50"}
                        >
                            {name}
                        </Tag>
                    ))}
                </Space>
            </Modal>
            <Button.Group>
                <Button
                    onClick={onClick}
                >
                    查看
                </Button>
                <Button
                    onClick={onDownload}
                >
                    下载
                </Button>
                <Popconfirm
                    title="确认要删除吗？删除后所有文件将要消失"
                    onConfirm={onDelete}
                >
                    <Button
                        danger
                    >
                        删除
                    </Button>
                </Popconfirm>
            </Button.Group>
        </>
    )
}
const Admin = () => {
    const [dataSource, setDataSource] = useState([]);
    const getData = useCallback(() => {
        setLoading(true);
        getWorks().then(({ data }) => {
            setDataSource(data.map((e, key) => ({ ...e, key })));
            setLoading(false);
        })
    }, []);
    const columns = useMemo(() => {
        return [{
            title: () => {
                return (
                    <Addition
                        onReset={getData}
                    />
                )
            },
            dataIndex: 'name'
        }, {
            title: '备注',
            dataIndex: "comment"
        }, {
            render: (data) => {
                return (
                    <Viewer
                        data={data}
                        reload={getData}
                    />
                )
            }
        }]
    }, []);
    const [loading, setLoading] = useState(true)
    useEffect(getData, []);
    return (
        <Layout>
            <Layout.Content>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                />
            </Layout.Content>
        </Layout>
    )
}
export default Admin