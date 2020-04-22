import React from "react";
import { List, Avatar } from "antd";
import { DollarCircleOutlined } from "@ant-design/icons";
import DetailModal from "../components/DetailModal";

const IconText = ({ type, text }) => (
    <span>
        <DollarCircleOutlined
            type={type}
            style={{
                marginRight: 8,
            }}
        />
        <b>
            {text}
        </b>
    </span>
);


class Items extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            itemID: 1
        }
    }

    showModal = (item) => {
        this.setState({
            visible: true,
            itemID: item,
        })
    }

    handleCancel = () => {
        this.setState({ visible: false, })
    }

    handleOK = () => {
        this.setState({ visible: false, })
    }

    render() {
        return (
            <div>

            <List
                style={{ marginTop: "50px" }}
                itemLayout="vertical"
                size="large"
                pagination={{
                    pageSize: 3
                }}
                dataSource={this.props.data}
                renderItem={item => (
                    <List.Item
                    key={item.title}
                        actions={[
                            <IconText type="dollar" text={`${item.price} zł`} />
                        ]}
                        extra={
                            <img
                                onClick={() => this.showModal(item.id)}
                                width={272}
                                alt="logo"
                                src={item.image}
                            />
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.image} />}
                            title={<a type="link" onClick={() => this.showModal(item.id)}> {item.title} </a>}
                        />
                        {item.content}
                        {item.category}
                        {item.label}

                    </List.Item>
                )}
                />
                {(this.state.visible ?
                    (<div><DetailModal visible={this.state.visible} handleCancel={this.handleCancel} handleOK={this.handleOK} itemID={this.state.itemID} /></div>)
                    : null)}
                </div>
        );
    }
}

export default Items;