import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { authLogin } from "../store/actions/auth";
import '../components/static/styles.less';
import Offer from '../components/Offer';


const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;


class NormalLoginForm extends React.Component {
    state = {
        username: "",
        password: ""
      };

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.login(username, password);
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    

    render() {
        const { error, loading, token } = this.props;
        const { username, password } = this.state;
        if (token) {
          return <Redirect to="/" />;
        }

        const { getFieldDecorator } = this.props.form;
        return (

            <div className="input" style={{ marginTop: "200px", position: "center" }}>
                {error && <p>{this.props.error.message}</p>}

                {
                    this.props.loading ?


                        <Spin indicator={antIcon} />

                        :
                        <Offer key="offer" isMobile={null} />,
                        <Form onSubmit={this.handleSubmit} className="login-form" style={{ padding: "20px", marginTop: "200px", position: "center" }}>
                            <div className="input">

                                <FormItem >
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input onChange={this.handleChange} value={username} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                    )}
                                </FormItem>

                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input onChange={this.handleChange} value={password} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                    )}
                                </FormItem>

                            </div>
                            <FormItem style={{ display: "inlineBlock", textAlign: "center" }}>
                                <Button loading={loading} type="danger" htmlType="submit" size="large" style={{ marginRight: '10px' }}>
                                    Login
                    </Button>
                    Or
                    <NavLink
                                    style={{ marginRight: '10px', color: 'red' }}
                                    to='/signup/'> signup
                    </NavLink>
                            </FormItem>
                        </Form>
                }
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
      login: (username, password) => dispatch(authLogin(username, password))
    };
  };  

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);