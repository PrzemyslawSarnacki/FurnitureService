import React from 'react'
import {Form, Input, Button, Select} from 'antd'

export class AddressForm extends React.Component {
constructor(props) {
    super(props)

    this.state = {
        error: null,
        loading: false,
        formData: {
          address_type: "",
          apartment_address: "",
          country: "",
          default: false,
          id: "",
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
        e.preventDefault();
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
          .then(res => {
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
          .then(res => {
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
          const { countries } = this.props;
          const { error, formData, success, saving } = this.state;
        return (
            <div>
                
                <Form onSubmit={this.handleSubmit} success={success} error={error}>

                    
                </Form>

            </div>
        )
    }
}

export default AddressForm
