import React from "react";
import axios from "axios";
import Items from "../components/Item";
import CustomForm from "../components/Form";


class ItemList extends React.Component {
  state = {
    items: []
  };

  fetchItems = () => {
    axios.get("http://127.0.0.1:8000/api/products/").then(res => {
      this.setState({
        items: res.data
      });
      console.log(res.data)
    });
  }

  componentDidMount() {
    this.fetchItems();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchItems();      
    }
  }

  render() {
    return (
        <div style={{ padding: "20px" }}>
        <Items data={this.state.items} />   <br/>
        <h2> Create an Item </h2>
        <CustomForm requestType="post" itemID={null} btnText="Create" />
      </div>
    );
  }
}

export default ItemList;