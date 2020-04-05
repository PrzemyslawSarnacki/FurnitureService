import React from 'react'
import { Modal, Button, Avatar, Row, Col } from 'antd';
import axios from "axios";
import { connect } from "react-redux";
import { DollarCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";


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


class DetailModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
        }
    }

    componentDidMount() {
        const itemID = this.props.itemID;
        axios.get(`http://127.0.0.1:8000/api/products/${itemID}`).then(res => {
            this.setState({
                item: res.data
            });
        });
    }

    render() {
        console.log(this.state.item.variations)
        return (
            <div>
                <Modal
                    visible={this.props.visible}
                    title={this.state.item.title}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.props.handleCancel}>
                            Wróć
            </Button>,
                        <Button key="submit" type="danger" onClick={this.props.handleOk}>
                            OK
            </Button>,
                    ]}
                >
                    <div>
                        <p> {this.state.item.content} </p>
                        <img
                            width={260}
                            alt="logo"
                            src={this.state.item.image}
                        />,
                        <p><IconText type="dollar" text={`${this.state.item.price} zł`} /></p>
                        {this.state.item.label}
                        {this.state.item.description}
                        <p>
                        <React.Fragment>
                            <Button type="primary">
                                Dodaj do Koszyka
                        <ShoppingCartOutlined
                                    style={{
                                        marginRight: 8,
                                        size: 50,
                                    }}
                                    />
                            </Button>
                        </React.Fragment>
                                    </p>
                        
                          <Row>
                            {this.state.item.variations &&
                                this.state.item.variations.map(v => {

                                    return (

                                        <React.Fragment key={v.id}>
                                            <Col xs={4} sm={4} md={6} xl={8}>

                                                <h4>
                                                    {v.name}
                                                </h4>
                                                {v.item_variations.map(iv => {
                                                    return (

                                                        <React.Fragment key={iv.id}>


                                                            {iv.attachment && (
                                                                <Avatar shape="square" size={64}
                                                                    src={`http://127.0.0.1:8000${iv.attachment}`}
                                                                />

                                                            )}
                                                            <IconText type="dollar" text={`${iv.value} zł`} />

                                                        </React.Fragment>
                                                    );
                                                })}
                                            </Col>
                                        </React.Fragment>

                                    );
                                })}
                        </Row>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(DetailModal);