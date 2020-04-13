import React from 'react'
import { Table } from 'antd'
import { orderHistoryURL } from "../constants";
import { authAxios } from "../utils";


class OrderHistory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            error: null,
            loading: false
        }
    }

    componentDidMount() {
        this.handleFetchOrders();
    }

    handleFetchOrders = () => {
        this.setState({ loading: true });
        authAxios
            .get(orderHistoryURL)
            .then(res => {
                this.setState({
                    data: res.data,
                    loading: false
                });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    formatData = data => {
        var finalData = [];
        console.log(data)
        if (data !== null) {
            {
                data.order_items.map((orderItem, i) => {
        if (orderItem.item_variations.length > 0) {
            orderItem.item_variations.map((itemVariation) => {
                finalData.push(
                    {
                        key: i + 1,
                        name: itemVariation.variation.name,
                        quantity: orderItem.quantity,
                        price: orderItem.item.price,
                        totalPrice: orderItem.final_price,
                        value: itemVariation.value,
                    }
                    )
                })
            }else {
                finalData.push(
                {
                    key: i + 1,
                    name: orderItem.item.title,
                    quantity: orderItem.quantity, 
                    price: orderItem.item.price,
                    totalPrice: orderItem.final_price,
                    value: "",

                }
            )
        }
    

        }
                )
    }
    }
        return finalData;
    }

    render() {


        const { data } = this.state;

        const columns = [
            {
                title: 'Lp.',
                dataIndex: 'key',
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
            },
        ];

        return (
            <div>
                <Table
                    style={{ marginTop: "200px", marginBottom: "200px",  overflow: "auto"  }}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.value}</p>,
                        rowExpandable: record => record.value !== "",
                    }}
                    dataSource={this.formatData(data)}
                    pagination={false}
                    bordered
                />

            </div>
        )
    }
}

export default OrderHistory

