import React from 'react';
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { authLogin } from "../store/actions/auth.js";
import '../components/static/styles.less';
import { Form, Input, Button, Checkbox, Spin } from 'antd';


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;



class NormalLoginForm extends React.Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state =  {
            username: "",
            password: ""
          };
      }
    
    handleSubmit = (e) => {
        // e.preventDefault();
        const { username, password } = this.state;
        this.props.login(username, password);
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { error, token } = this.props;
        if (token) {
          return <Redirect to="/" />;
        }

        return (
            <div className="input" style={{ position: "center" }}>
                {error && <p>{this.props.error.message}</p>}
                { this.props.loading ?
                        <Spin indicator={antIcon} />
                        :
                        <React.Fragment>
                        <Form
                        style={{ marginTop: "200px"}}
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.handleSubmit}
                      >
                        <Form.Item
                          name="username"
                          rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                          <Input 
                          name="username"
                          onChange={this.handleChange} prefix={<UserOutlined className="site-form-item-icon " />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            onChange={this.handleChange}
                          name="password"
                          rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                          <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="primary"
                            placeholder="Password"
                            name="password"
                            onChange={this.handleChange}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Form.Item  name="remember" valuePropName="checked" style={{color: 'red' }}>
                            <Checkbox  style={{checked:{backgroundColor: 'red'} }} >Remember me</Checkbox>
                          </Form.Item>
                  
                        </Form.Item>
                  
                        <Form.Item>
                          <Button type="primary" htmlType="submit" className="login-form-button" style={{ marginRight: '10px'}}>
                          Zaloguj się
                          </Button>
                           Lub
                          <NavLink
                                          style={{ marginRight: '10px', color: 'red' }}
                                          to='/signup/'> Załóż konto
                          </NavLink>
                        </Form.Item>
                      </Form>
                      </React.Fragment>
                }
            </div>
        );
    }
}



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

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);