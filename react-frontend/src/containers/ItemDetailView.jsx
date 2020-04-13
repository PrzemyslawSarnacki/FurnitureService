import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card } from "antd";
// import CustomForm from "../components/Form";


class ItemDetail extends React.Component {
  state = {
    item: {}
  };

  componentDidMount() {
    const itemID = this.props.match.params.itemID;
    axios.get(`http://127.0.0.1:8000/api/products/${itemID}`).then(res => {
      this.setState({
        item: res.data
      });
    });
  }

  handleDelete = event => {
    event.preventDefault();
    const itemID = this.props.match.params.itemID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.delete(`http://127.0.0.1:8000/api/products/${itemID}/delete/`)
    .then(res => {
      if (res.status === 204) {
        this.props.history.push(`/`);
      }
    })
  };

  render() {
    return (
      <div style={{ padding: "20px"}}>
        <Card title={this.state.item.title} style={{marginTop: "80px"}}>
          
          <p> {this.state.item.content} </p>
          <img
              width={272}
              alt="logo"
              src={this.state.item.image}
            />
          {this.state.item.category}
        <p><b>Price:  </b>{this.state.item.price}</p>
        {this.state.item.label}
        </Card>
        {/* <CustomForm
          {...this.props}
          token={this.props.token}
          requestType
          itemID={this.props.match.params.itemID}
          btnText="Update"
        /> */}
        <form onSubmit={this.handleDelete}>
          <Button type="primary" size="large" htmlType="submit" >
            Delete
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(ItemDetail);