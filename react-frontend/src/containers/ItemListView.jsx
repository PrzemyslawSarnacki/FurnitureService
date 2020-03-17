import React from "react";
import axios from "axios";
import Items from "../components/Item";
import CustomForm from "../components/Form";
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';


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
        <ScrollOverPack id="page1" className="content-wrapper page login-form"  style={{ padding: "20px", marginTop: "200px" }}>   
        <div>
        <Items data={this.state.items} /> <br />
        <h2> Create an Item </h2>
        <CustomForm requestType="post" itemID={null} btnText="Create" />
      </div>
        </ScrollOverPack>
    );
  }
}

export default ItemList;