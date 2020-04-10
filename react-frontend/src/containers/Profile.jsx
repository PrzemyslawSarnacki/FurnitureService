import React from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    countryListURL,
    addressListURL,
    addressCreateURL,
    addressUpdateURL,
    addressDeleteURL,
    userIDURL,
    paymentListURL
} from "../constants";
import { authAxios } from "../utils";
import { Menu, Button, Divider, Card } from 'antd';

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";



class Profile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeItem: "billingAddress",
            addresses: [],
            countries: [],
            userID: null,
            selectedAddress: null
        }
    }

    componentDidMount() {
        this.handleFetchAddresses();
        this.handleFetchCountries();
        this.handleFetchUserID();
    }


    handleItemClick = name => {
        this.setState({ activeItem: name }, () => {
            this.handleFetchAddresses();
        });
    };

    handleGetActiveItem = () => {
        const { activeItem } = this.state;
        if (activeItem === "billingAddress") {
            return "Billing Address";
        } else if (activeItem === "shippingAddress") {
            return "Shipping Address";
        }
        return "Payment History";
    };

    handleFormatCountries = countries => {
        const keys = Object.keys(countries);
        return keys.map(k => {
            return {
                key: k,
                text: countries[k],
                value: k
            };
        });
    };

    handleDeleteAddress = addressID => {
        authAxios
            .delete(addressDeleteURL(addressID))
            .then(res => {
                this.handleCallback();
            })
            .catch(err => {
                this.setState({ error: err });
            });
    };

    handleSelectAddress = address => {
        this.setState({ selectedAddress: address });
    };

    handleFetchUserID = () => {
        authAxios
            .get(userIDURL)
            .then(res => {
                this.setState({ userID: res.data.userID });
            })
            .catch(err => {
                this.setState({ error: err });
            });
    };

    handleFetchCountries = () => {
        authAxios
            .get(countryListURL)
            .then(res => {
                this.setState({ countries: this.handleFormatCountries(res.data) });
            })
            .catch(err => {
                this.setState({ error: err });
            });
    };

    handleFetchAddresses = () => {
        this.setState({ loading: true });
        const { activeItem } = this.state;
        authAxios
            .get(addressListURL(activeItem === "billingAddress" ? "B" : "S"))
            .then(res => {
                this.setState({ addresses: res.data, loading: false });
            })
            .catch(err => {
                this.setState({ error: err });
            });
    };

    handleCallback = () => {
        this.handleFetchAddresses();
        this.setState({ selectedAddress: null });
    };

    renderAddresses = () => {
        const {
            activeItem,
            addresses,
            countries,
            selectedAddress,
            userID
        } = this.state;
        return (
            <React.Fragment>
                <Card
                    title="Default size card"
                    extra={
                        <React.Fragment>
                            <Button color="yellow" onClick={() => this.handleSelectAddress(a)}>
                                Update
                            </Button>
                            <Button color="red" onClick={() => this.handleDeleteAddress(a.id)}>
                                Delete
                            </Button>
                        </React.Fragment>}
                    style={{ width: 300 }}
                >
                    {addresses.map(a => {
                        return (
                            <React.Fragment>
                                {a.default && (
                                    <Tag color="green">Domyślny adres</Tag>
                                )}
                                <h1>
                                    {a.street_address}, {a.apartment_address}
                                </h1>
                                <p>{a.country}</p>
                                <p>{a.zip}</p>
                            </React.Fragment>
                );
                    })}
                </Card>
                {addresses.length > 0 ? <Divider /> : null}
                {selectedAddress === null ? (
                    <AddressForm
                        activeItem={activeItem}
                        countries={countries}
                        formType={CREATE_FORM}
                        userID={userID}
                        callback={this.handleCallback}
                    />
                ) : null}
                {selectedAddress && (
                    <AddressForm
                        activeItem={activeItem}
                        userID={userID}
                        countries={countries}
                        address={selectedAddress}
                        formType={UPDATE_FORM}
                        callback={this.handleCallback}
                    />
                )}
            </React.Fragment>
        );
    };



    render() {
        const { activeItem, error, loading } = this.state;
        const { isAuthenticated } = this.props;
        if (!isAuthenticated) {
            return <Redirect to="/login" />;
        }
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Menu
                            style={{ width: 256 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode={this.state.mode}
                            theme={this.state.theme}
                        >
                            <Menu.Item key="1">
                                <MailOutlined />
                                    Adres wysyłki
                        </Menu.Item>
                            <Menu.Item key="2">
                                <CalendarOutlined />
                                Adres płatności
                        </Menu.Item>
                            <Menu.Item key="3">
                                <CalendarOutlined />
                                    Historia płatności
                        </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={18}>
                        <Header>{this.handleGetActiveItem()}</Header>
                        <Divider />
                        {activeItem === "paymentHistory" ? (
                            <PaymentHistory />
                        ) : (
                                this.renderAddresses()
                            )}
                    </Col>

                </Row>


            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Profile);
