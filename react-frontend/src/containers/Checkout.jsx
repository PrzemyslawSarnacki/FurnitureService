import React from 'react'
import { Link } from "react-router-dom";
import { authAxios } from "../utils";
import { Button, Avatar, Divider, Select, message } from 'antd'
import OrderPreview from "../components/OrderPreview";

import {
    checkoutURL,
    orderSummaryURL,
    addCouponURL,
    addToCartURL,
    addressListURL,
    orderItemDeleteURL,
    orderItemUpdateQuantityURL
} from "../constants";


class Checkout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            loading: false,
            error: null,
            success: false,
            shippingAddresses: [],
            billingAddresses: [],
            selectedBillingAddress: "",
            selectedShippingAddress: ""
        }
    }

    componentDidMount() {
        this.handleFetchOrder();
        this.handleFetchBillingAddresses();
        this.handleFetchShippingAddresses();
    }


    handleGetDefaultAddress = addresses => {
        const filteredAddresses = addresses.filter(el => el.default === true);
        if (filteredAddresses.length > 0) {
            return filteredAddresses[0].id;
        }
        return "";
    };

    handleFetchBillingAddresses = () => {
        this.setState({ loading: true });
        authAxios
            .get(addressListURL("B"))
            .then(res => {
                this.setState({
                    billingAddresses: res.data.map(a => {
                        return {
                            key: a.id,
                            text: `${a.street_address}, ${a.city}, ${a.country}`,
                            value: a.id
                        };
                    }),
                    selectedBillingAddress: this.handleGetDefaultAddress(res.data),
                    loading: false
                });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleFetchShippingAddresses = () => {
        this.setState({ loading: true });
        authAxios
            .get(addressListURL("S"))
            .then(res => {
                this.setState({
                    shippingAddresses: res.data.map(a => {
                        return {
                            key: a.id,
                            text: `${a.street_address}, ${a.city}, ${a.country}`,
                            value: a.id
                        };
                    }),
                    selectedShippingAddress: this.handleGetDefaultAddress(res.data),
                    loading: false
                });
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleFetchOrder = () => {
        this.setState({ loading: true });
        authAxios
            .get(orderSummaryURL)
            .then(res => {
                this.setState({ data: res.data, loading: false });
            })
            .catch(err => {
                // if (err.response.status === 404) {
                //     this.props.history.push("/products");
                // } else {
                console.log(err)
                this.setState({ error: err, loading: false });
                // }
            });
    };

    handleAddCoupon = (e, code) => {
        e.preventDefault();
        this.setState({ loading: true });
        authAxios
            .post(addCouponURL, { code })
            .then(res => {
                this.setState({ loading: false });
                this.handleFetchOrder();
            })
            .catch(err => {
                this.setState({ error: err, loading: false });
            });
    };

    handleSelectChange = (e, { name, value }) => {
        console.log("change")
        this.setState({ [name]: value });
    };

    handleMessage = (msg, status) => {
        if (status === "success") {
            message.success(msg)
        }
        else if (status === "") {
            message.warning(msg)
        }
        else {
            message.error(msg)
        }
    };

    submit = ev => {
        ev.preventDefault();
        this.setState({ loading: true });
        if (this.props.stripe) {
            this.props.stripe.createToken().then(result => {
                if (result.error) {
                    this.setState({ error: result.error.message, loading: false });
                } else {
                    this.setState({ error: null });
                    const {
                        selectedBillingAddress,
                        selectedShippingAddress
                    } = this.state;
                    authAxios
                        .post(checkoutURL, {
                            stripeToken: result.token.id,
                            selectedBillingAddress,
                            selectedShippingAddress
                        })
                        .then(res => {
                            this.setState({ loading: false, success: true });
                        })
                        .catch(err => {
                            this.setState({ loading: false, error: err });
                        });
                }
            });
        } else {
            console.log("Stripe is not loaded");
        }
    };


    render() {
        const {
            data,
            error,
            loading,
            success,
            billingAddresses,
            shippingAddresses,
            selectedBillingAddress,
            selectedShippingAddress
        } = this.state;
        console.log(data)
        console.log(this.state)
        return (
            <div
                style={{ textAlign: "center", marginTop: "90px" }}
            >
                <OrderPreview data={data} />


                <div style={{  }}
                >

                    {billingAddresses.length > 0 ? (
                        <Select
                            name="selectedBillingAddress"
                            value={selectedBillingAddress}
                            options={billingAddresses}
                            onChange={this.handleSelectChange}
                        >
                            {console.log(billingAddresses)}
                            {billingAddresses.map(billingAddress =>
                                <Select.Option value={billingAddress}>{billingAddress}</Select.Option>
                            )}
                        </Select>
                    ) : (
                            <p>
                                You need to <Link to="/profile">add a billing address</Link>
                            </p>
                        )}
                    <h1>Select a shipping address</h1>
                        {console.log(shippingAddresses)}
                    {shippingAddresses.length > 0 ? (
                
                        <Select
                            name="selectedShippingAddress"
                            value={selectedShippingAddress}
                            onChange={this.handleSelectChange}
                        >
                            {shippingAddresses.map(shippingAddress =>
                                <Select.Option value={shippingAddress}>{shippingAddress}</Select.Option>
                            )}

                        </Select>
                    ) : (
                            <p>
                                You need to <Link to="/profile">add a shipping address</Link>
                            </p>
                        )}
                    <Divider />

                    {billingAddresses.length < 1 || shippingAddresses.length < 1 ? (
                        <p>You need to add addresses before you can complete your purchase</p>
                    ) : (
                            <React.Fragment>
                                <h1>Would you like to complete the purchase?</h1>
                                {success && (
                                    <div>
                                        {this.handleMessage("Your payment was successful", "success")}
                                        <p>
                                            Go to your <b>profile</b> to see the order delivery status.
                                        </p>
                                    </div>
                                )}

                                <Button
                                    style={{ marginTop: "10px", position: "center", textAlign: "center", }}
                                    loading={loading}
                                    disabled={loading}
                                    onClick={this.submit}
                                >
                                    Potwierdź
                                </Button>
                            </React.Fragment>

                        )}
                </div>

            </div>
        )
    }
}

export default Checkout;
