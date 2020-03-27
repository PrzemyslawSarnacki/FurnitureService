import React from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import '../components/static/styles.less';
import { Input, Button } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onAuth(
            values.userName,
            values.email,
            values.password,
            values.confirm
        );
        this.props.history.push('/');
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <ScrollOverPack id="page1" className="content-wrapper page">

    <Form onSubmit={this.handleSubmit} className="login-form" style={{ padding: "20px", marginTop: "200px" }}>
      <div className="input">

      <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
              <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
      </FormItem>
      
      <FormItem>
        {getFieldDecorator('email', {
          rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
              required: true, message: 'Please input your E-mail!',
            }],
      })(
        <Input prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('password', {
          rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
      })(
          <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('confirm', {
          rules: [{
            required: true, message: 'Please confirm your password!',
          }, {
              validator: this.compareToFirstPassword,
          }],
        })(
          <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
          )}
      </FormItem>

      <FormItem>
      <Button type="danger" size="large" htmlType="submit" style={{marginRight: '10px'}}>
          Signup
      </Button>
      Or 
      <NavLink 
          style={{marginRight: '10px', color: "red"}} 
          to='/login/'> login
      </NavLink>
      </FormItem>

          </div>
    </Form>
  </ScrollOverPack>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);
