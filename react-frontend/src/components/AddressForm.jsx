import React from 'react'
import {Form, Input, Button, Select, Checkbox} from 'antd'
import {
    addressCreateURL,
    addressUpdateURL} 
from "../constants";
import { authAxios } from "../utils";


const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";


export class AddressForm extends React.Component {
constructor(props) {
    super(props)

    this.state = {
        error: null,
        loading: false,
        formData: {
          address_type: "",
          city: "",
          phone_number: "",
          country: "Poland",
          default: false,
          // id: "",
          street_address: "",
          user: 1,
          zip: ""
        },
        saving: false,
        success: false
    }
}

      componentDidMount() {
        const { address, formType } = this.props;
        if (formType === UPDATE_FORM) {
          this.setState({ formData: address });
        }
      }
    
      handleToggleDefault = () => {
        const { formData } = this.state;
        const updatedFormdata = {
          ...formData,
          default: !formData.default
        };
        this.setState({
          formData: updatedFormdata
        });
      };
    
      handleChange = e => {
        const { formData } = this.state;
        console.log(e.target.name)
        const updatedFormdata = {
          ...formData,
          [e.target.name]: e.target.value
        };
        this.setState({
          formData: updatedFormdata
        });
      };
    
      handleSelectChange = (e, { name, value }) => {
        const { formData } = this.state;
        const updatedFormdata = {
          ...formData,
          [name]: value
        };
        this.setState({
          formData: updatedFormdata
        });
      };
    
      handleSubmit = e => {
        this.setState({ saving: true });
        // e.preventDefault();
        const { formType } = this.props;
        if (formType === UPDATE_FORM) {
          this.handleUpdateAddress();
        } else {
          this.handleCreateAddress();
        }
      };
    
      handleCreateAddress = () => {
        const { userID, activeItem } = this.props;
        const { formData } = this.state;
        authAxios
          .post(addressCreateURL, {
            ...formData,
            user: userID,
            address_type: activeItem === "billingAddress" ? "B" : "S"
          })
          .then(() => {
            this.setState({
              saving: false,
              success: true,
              formData: { default: false }
            });
            this.props.callback();
          })
          .catch(err => {
            this.setState({ error: err });
          });
      };
    
      handleUpdateAddress = () => {
        const { userID, activeItem } = this.props;
        const { formData } = this.state;
        authAxios
          .put(addressUpdateURL(formData.id), {
            ...formData,
            user: userID,
            address_type: activeItem === "billingAddress" ? "B" : "S"
          })
          .then(() => {
            this.setState({
              saving: false,
              success: true,
              formData: { default: false }
            });
            this.props.callback();
          })
          .catch(err => {
            this.setState({ error: err });
          });
      };
      
      
      
      render() {        
          const { error, formData, success } = this.state;
        return (
            <div>
                
                <Form onFinish={this.handleSubmit} success={success} error={error}>
                    <Form.Item label="Miejscowość" name="city">
                        <Input placeholder="Miejscowość" name="city" onChange={this.handleChange}/>
                    </Form.Item>
                    <Form.Item label="Ulica" name="street_address">
                        <Input placeholder="Ulica" name="street_address" onChange={this.handleChange}/>
                    </Form.Item>
                    <Form.Item label="Kraj" name="country">
                        <Select key="countrySelect" defaultValue="Poland" name="country" style={{ width: 120 }} placeholder="kraj" onChange={this.handleChange}>
                            <Select.Option key="country" value="Poland" name="country">Polska</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Adres pocztowy" name="zip">
                        <Input placeholder="Adres pocztowy" name="zip" onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item
                            name="phone_number"
                            label="Numer kontaktowy"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                            ]}
                        >
                                <Input
                               onChange={this.handleChange}
                                name="phone_number"
                                placeholder="Numer kontaktowy"
                                addonBefore={
                                    <Form.Item name="prefix" noStyle>
                                    <Select
                                      defaultValue="+48"
                                      style={{
                                        width: 70,
                                      }}
                                    >
                                      <Select.Option value="+48">+48</Select.Option>
                                    </Select>
                                  </Form.Item>
                                }
                                style={{
                                    width: '100%',
                                }}
                                />
                    </Form.Item>

                    <Checkbox checked={formData.default} name="default" onChange={this.handleToggleDefault}>Ustawić jako domyślny?</Checkbox>
                    <Button htmlType="submit">Zapisz</Button>
                </Form>

            </div>
        )
    }
}

export default AddressForm
