import React from 'react'
import { Link } from "react-router-dom";
import { authAxios } from "../utils";

import {
    addToCartURL,
    orderSummaryURL,
    orderItemDeleteURL,
    orderItemUpdateQuantityURL
} from "../constants";


class Checkout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
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
                            text: `${a.street_address}, ${a.apartment_address}, ${a.country}`,
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
                            text: `${a.street_address}, ${a.apartment_address}, ${a.country}`,
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
                if (err.response.status === 404) {
                    this.props.history.push("/products");
                } else {
                    this.setState({ error: err, loading: false });
                }
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
        this.setState({ [name]: value });
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
      
        return (
            <div>

            </div>
        )
    }
}

export default Checkout;
