import React from 'react'
import { Table } from 'antd'
import {paymentListURL} from "../constants";
import { authAxios } from "../utils";


class PaymentHistory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            payments: []
        }
    }

    componentDidMount() {
        this.handleFetchPayments();
    }

    handleFetchPayments = () => {
        this.setState({ loading: true });
        authAxios
            .get(paymentListURL)
            .then(res => {
                this.setState({
                    loading: false,
                    payments: res.data
                });
                console.log(res.data)
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    formatData = payments => {
        var finalData = [];
        console.log(payments)
        if (payments !== null || payments !== []) {

            payments.map(p => {
                console.log(p)
                finalData.push(
                    {
                        key: p.id,
                        amount: p.amount,
                        date: new Date(p.timestamp).toUTCString(),
                    }
                )
            })
        }

        return finalData;
    }

    render() {


        const { payments } = this.state;

        const columns = [
            {
                title: 'Lp.',
                dataIndex: 'key',
            },
            {
                title: 'Ilość',
                dataIndex: 'amount',
            },
            {
                title: 'Data',
                dataIndex: 'date',
            },
        ];

        return (
            <div>
                <Table
                    style={{ marginTop: "200px", marginBottom: "200px", overflow: "auto"  }}
                    columns={columns}
                    expandable={{
                        expandedRowRender: record => <p style={{ margin: 0 }}>{record.value}</p>,
                        rowExpandable: record => record.value !== "",
                    }}
                    dataSource={this.formatData(payments)}
                    pagination={false}
                    bordered
                />

            </div>
        )
    }
}

export default PaymentHistory

