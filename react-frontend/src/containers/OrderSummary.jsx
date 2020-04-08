import React from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { authAxios } from "../utils";
import { Table, Typography } from 'antd'
import {
    addToCartURL,
    orderSummaryURL,
    orderItemDeleteURL,
    orderItemUpdateQuantityURL
} from "../constants";


class OrderSummary extends React.Component {
    state = {
        data: null,
        error: null,
        loading: false
    };

    componentDidMount() {
        this.handleFetchOrder();
    }

    handleFetchOrder = () => {
        this.setState({ loading: true });
        authAxios
            .get(orderSummaryURL)
            .then(res => {
                console.log(res.data)
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
        // convert [{id: 1},{id: 2}] to [1,2] - they're all variations
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

    handleRemoveQuantityFromCart = slug => {
        authAxios
            .post(orderItemUpdateQuantityURL, { slug })
            .then(res => {
                this.handleFetchOrder();
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
    // const { data } = this.state;


        const data = [

            {
              key: '1',
              name: "Nazwa",
              price: 100,
              quantity: 100,
              totalPrice: 100,
              action: "Delete",
            },

            {
              key: '2',
              name: "Nazwa",
              price: 100,
              quantity: 100,
              totalPrice: 100,
              action: "Delete",
            },
            {
              key: '3',
              name: "Nazwa",
              price: 100,
              quantity: 100,
              totalPrice: 100,
              action: "Delete",
            },
            {
              key: '4',
              name: "Nazwa",
              price: 100,
              quantity: 100,
              totalPrice: 100,
              action: "Delete",
            },
            {
              key: '5',
              name: "Nazwa",
              price: 100,
              quantity: 100,
              totalPrice: 100,
              action: "Delete",
            },
            {
              key: '6',
              name: "Nazwa",
              price: 100,
              quantity: 100,
              totalPrice: 100,
              action: "Delete",
            },
          ];
          
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
            {
              title: 'Akcja',
              dataIndex: 'action',
            },
          ];
          
          
        return (
            <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            summary={pageData => {
              let total = 0;
              let totalRepayment = 0;
        
              pageData.forEach(({ totalPrice }) => {
                total += totalPrice;
              });
        
              return (
                <>
                  <tr>
                    <th>Całkowicie:</th>
                    <td>
                    </td>
                    <td>
                    </td>
                    <td>
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
            )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(OrderSummary);
