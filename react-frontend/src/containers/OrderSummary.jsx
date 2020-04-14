import React from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { authAxios } from "../utils";
import { Table, Typography, Button } from 'antd'
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import {
    addToCartURL,
    orderSummaryURL,
    orderItemDeleteURL,
    orderItemUpdateQuantityURL
} from "../constants";


class OrderSummary extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            error: null,
            loading: false
        }
    }

    componentDidMount() {
        this.handleFetchOrder();
    }

    handleFetchOrder = () => {
        this.setState({ loading: true });
        authAxios
            .get(orderSummaryURL)
            .then(res => {
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {
                if (err.response.status === 404) {
                    this.setState({
                        error: "You currently do not have an order",
                        loading: false
                    });
                } else {
                    this.setState({ error: err, loading: false });
                }
            });
    };


    renderVariations = orderItem => {
        let text = "";
        orderItem.item_variations.forEach(iv => {
            text += `${iv.variation.name}: ${iv.value}, `;
        });
        return text;
    };

    handleFormatData = itemVariations => {
        return Object.keys(itemVariations).map(key => {
            return itemVariations[key].id;
        });
    };

    handleAddToCart = (slug, itemVariations) => {
        this.setState({ loading: true });
        const variations = this.handleFormatData(itemVariations);
        authAxios
            .post(addToCartURL, { slug, variations })
            .then(res => {
                this.handleFetchOrder();
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleRemoveQuantityFromCart = (slug, itemVariations) => {
        this.setState({ loading: true });
        let variations = []
        if (itemVariations !== undefined && itemVariations.length > 0) {
            variations = this.handleFormatData(itemVariations);
        }
        authAxios
            .post(orderItemUpdateQuantityURL, { slug, variations })
            .then(res => {
                this.handleFetchOrder();
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({ error: err });
            });
    };

    handleRemoveItem = itemID => {
        authAxios
            .delete(orderItemDeleteURL(itemID))
            .then(res => {
                this.handleFetchOrder();
            })
            .catch(err => {
                this.setState({ error: err });
            });
    };

    render() {
        const { isAuthenticated } = this.props;
        if (!isAuthenticated) {
            return <Redirect to="/login" />;
        }
        const formatData = (data) => {
            var finalData = [];
            if (data !== null) {
                    data.order_items.forEach((orderItem, i) => {
                        if (orderItem.item_variations.length > 0) {
                            orderItem.item_variations.forEach((itemVariation) => {
                                finalData.push({
                                    key: i + 1,
                                    name: itemVariation.variation.name,
                                    quantity: (<div>
                                        <Button size="small" icon={<MinusOutlined />} onClick={() => this.handleRemoveQuantityFromCart(orderItem.item.slug, orderItem.item_variations)} />
                                        {orderItem.quantity}
                                        <Button size="small" icon={<PlusOutlined />} onClick={() => this.handleAddToCart(orderItem.item.slug, orderItem.item_variations)} />
                                    </div>),
                                    price: orderItem.item.price,
                                    totalPrice: orderItem.final_price,
                                    value: itemVariation.value,
                                    action: <Button size="small" icon={<DeleteOutlined />} onClick={() => this.handleRemoveItem(orderItem.id)} />,
                                })
                            })
                        } else {
                            finalData.push({
                                key: i + 1,
                                name: orderItem.item.title,
                                quantity:
                                    (<div>
                                        <Button size="small" icon={<MinusOutlined />} onClick={() => this.handleRemoveQuantityFromCart(orderItem.item.slug)} />
                                        {orderItem.quantity}
                                        <Button size="small" icon={<PlusOutlined />} onClick={() => this.handleAddToCart(orderItem.item.slug, orderItem.item_variations)} />
                                    </div>),
                                price: orderItem.item.price,
                                totalPrice: orderItem.final_price,
                                value: "",
                                action: <Button size="small" icon={<DeleteOutlined />} onClick={() => this.handleRemoveItem(orderItem.id)} />,
                            })
                        }
                    })
            }
            return finalData;
        }
        const data = formatData(this.state.data)

        const columns = [
            {
                title: 'Lp.',
                dataIndex: 'key',
                width: 10,
            },
            {
                title: 'Nazwa',
                dataIndex: 'name',
            },
            {
                title: 'Cena',
                dataIndex: 'price',
            },
            {
                title: 'Ilość',
                dataIndex: 'quantity',
            },
            {
                title: 'Cena całkowita',
                dataIndex: 'totalPrice',
                width: 90,
            },
            {
                title: '',
                dataIndex: 'action',
                width: 10,

            },
        ];


        return (
            <React.Fragment>

                <Table
                    style={{ marginTop: "90px", overflow: "auto" }}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.value}</p>,
                        rowExpandable: record => record.value !== "",
                    }}
                    dataSource={(data)}
                    pagination={false}
                    bordered
                    summary={pageData => {
                        let total = 0;

                        pageData.forEach(({ totalPrice }) => {
                            total += totalPrice;
                        });

                        return (
                            <>
                                <tr>
                                    <th colSpan="2">Całkowicie:</th>
                                    <td colSpan="3">
                                    </td>

                                    <td>
                                        <Typography><b>{total}</b></Typography>
                                    </td>
                                    <td>
                                    </td>
                                </tr>

                            </>
                        );
                    }}
                />
                <div style={{ textAlign: "center", margin: "20px" }}>
                    <Button>
                        <Link to="/checkout">
                            Kup teraz
                        </Link>
                    </Button>
                </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(OrderSummary);
