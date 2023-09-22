import { useCallback, useEffect, useMemo, useState } from "react"
import { Button, Col, Row, Form, Input, List, Upload, message } from "antd"
import styled from "styled-components"
import moment from "moment"
import { searchUser, getWorks, submitTask } from "./hooks/request"
import InboxOutlined from "@ant-design/icons/InboxOutlined"

const { Dragger } = Upload;

const Container = styled.div`
    max-width:600px;
    margin-left:auto;
    margin-right:auto;
    margin-top:80px;
    margin-bottom:120px;
`
const Title = styled.div`
    text-align:center;
    font-size:21px;
    font-weight:700;
`

const SearchName = ({
    onChange
}) => {
    const [value, setValue] = useState()
    const onSetValue = useCallback(({ target: { value } }) => {
        setValue(value)
    }, []);
    useEffect(() => {
        const time = setTimeout(() => {
            onChange(value)
        }, 500)
        return () => clearTimeout(time)
    }, [value]);
    return (
        <Input.Search
            placeholder="搜索姓名"
            onChange={onSetValue}
        />
    )
}

const SelectUser = ({ onChange, value }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const onSearch = useCallback((value) => {
        if (!value) setUsers([]);
        setLoading(true)
        setTimeout(() => {
            searchUser(value).then(({ data }) => {
                setUsers(data)
            }).catch(e => { console.log(e) }).finally(() => setLoading(false))
        }, 500)
    }, [])
    const renderItem = useCallback((item) => {
        return (
            <List.Item
                key={item.id}
                style={{
                    background: value?.id === item.id ? "#3f51bf" : "none",
                    cursor: 'pointer',
                    width: '100%',
                    transition: ".4s",
                    borderRadius: "5px",
                    paddingLeft: "10px"
                }}
                onClick={onChange.bind(null, item)}
            >
                <Row>
                    <Col flex="150px">
                        {item.idcard}
                    </Col>
                    <Col flex="auto">
                        {item.name}
                    </Col>
                </Row>
            </List.Item>
        )
    }, [value]);
    return (
        <>
            <SearchName
                onChange={onSearch}
            />
            <List
                style={{
                    maxHeight: 300,
                    overflow: 'auto',
                    padding: '0 16px',
                }}
                renderItem={renderItem}
                dataSource={users}
                loading={loading}
            />
        </>
    )
}

const WorkList = ({
    onChange,
    value
}) => {
    const [work, setWork] = useState([]);
    useEffect(() => {
        getWorks().then(({ data }) => {
            setWork(data)
        })
    }, []);
    const dataSource = useMemo(() => {
        return work.map((e, key) => ({ ...e, key }))
    }, [work])
    const renderItem = useCallback((item) => {
        const isBefore = moment(Date.now()).isBefore(moment(item.deadline))
        return (
            <List.Item
                key={item.id}
                style={{
                    cursor: 'pointer',
                    background: item.id === value?.id ? "#3f51bf" : (isBefore ? "none" : "#ccc"),
                    paddingLeft: "10px",
                    borderRadius: "5px",
                    transition: ".4s"
                }}

                onClick={() => {
                    isBefore && onChange(item)
                }}
            >
                <Row
                    style={{
                        width: '100%',
                        textAlign: "center",
                    }}
                >
                    <Col flex="200px">
                        {item.name}
                    </Col>
                    <Col flex="100">
                        {moment(item.deadline).format("YYYY-MM-DD")}
                    </Col>
                    <Col flex="auto">
                        {item.comment}
                    </Col>
                </Row>
            </List.Item>
        )
    }, [value])
    return (
        <>
            <Row
                style={{
                    width: '100%',
                    textAlign: "center",
                    background: '#ccc',
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderRadius: "5px",
                    paddingRight: 10
                }}
            >
                <Col flex="200px">
                    作业名
                </Col>
                <Col flex="100">
                    截止日期
                </Col>
                <Col flex="auto">
                    备注
                </Col>
            </Row>

            <List
                dataSource={dataSource}
                renderItem={renderItem}
            />
        </>
    )
}
const UploadFiles = ({ value, onChange }) => {
    return (
        <Dragger
            beforeUpload={() => false}
            onChange={({ fileList, file }) => {
                if (fileList.length < value?.length) {
                    onChange(fileList)
                    return;
                }
                onChange([... (!!value ? value : []), file])
            }}
            fileList={value || []}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
            </p>
        </Dragger>
    )
}
const Page = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const onFinish = useCallback((data) => {
        const formData = new FormData();
        formData.append("workid", data.work.id)
        formData.append("userid", data.user.id)
        for (let i = 0; i < data.files.length; i++) {
            formData.append(`files`, data.files[i])
        }
        setLoading(true)
        submitTask(formData).then(() => {
            // console.log(data)
            message.success("提交成功")
        }).finally(() => {
            setLoading(false);
        }).catch((e) => {
            message.error(`提交失败 - ${e.message}`)
        })
    }, [])
    return (
        <Container>
            <Title>大数据管理与应用专接本三班交作业系统</Title>
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item name="user" rules={[{ required: true }]}>
                    <SelectUser />
                </Form.Item>
                <Form.Item name="work" rules={[{ required: true }]}>
                    <WorkList />
                </Form.Item>
                <Form.Item name="files" rules={[{ required: true }]}>
                    <UploadFiles />
                </Form.Item>
            </Form>
            <Button
                onClick={() => {
                    form.submit()
                }}
                block
                type="primary"
                loading={loading}
            >
                submit
            </Button>
        </Container>
    )

}
export default Page