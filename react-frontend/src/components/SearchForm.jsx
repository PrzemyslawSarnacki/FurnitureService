import React, { useState } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
import { DownOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons';

const SearchForm = (props) => {
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();


    const getFields = () => {
        const count = expand ? 5 : 1;
        const children = [];

        for (let i = 0; i < count; i++) {
            children.push(
                <Col span={8} key={i} >
                    <Form.Item
                        name={`field-${i}`}
                        label={`Field ${i}`}
                        rules={[
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ]}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>,
            );
        }

        return children;
    };

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };


    return (
        <Form
            style={{ marginTop: "100px" }}
            form={form}
            onChange={props.onChangeValue}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <Row gutter={24}>{getFields()}</Row>
            <Row >
                <Col
                    span={24}
                    style={{
                        textAlign: 'left',
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Szukaj<SearchOutlined />
                    </Button>
                    <Button
                        style={{
                            marginLeft: 8,
                        }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Wyczyść
          </Button>
                    <a
                        style={{
                            marginLeft: 8,
                            fontSize: 12,
                        }}
                        onClick={() => {
                            setExpand(!expand);
                        }}
                    >
                        {expand ? <UpOutlined /> : <DownOutlined />} Więcej
                    </a>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchForm