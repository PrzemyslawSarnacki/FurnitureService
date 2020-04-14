import React from "react";
import axios from "axios";
import Items from "../components/Item";
import SearchForm from "../components/SearchForm";


class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filteredItems: [],
      value: '',
      visible: false
    };
    this.onChangeValueHandler = this.onChangeValueHandler.bind(this)
  }

  fetchItems = () => {
    axios.get("http://127.0.0.1:8000/api/products/").then(res => {
      this.setState({
        items: res.data,
        filteredItems: res.data,
      });
    });
  }

  componentDidMount() {
    this.fetchItems();
  }

  onChangeValueHandler = (e) => {
    this.setState({ value: e.target.value })
    this.setState({
      filteredItems: this.state.items.filter((item) => {
        return item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
      })
    })
  }

  render() {
    const { value } = this.state;
    return (
      <div style={{ padding: "20px" }}>
        <SearchForm value={value} onChangeValue={this.onChangeValueHandler} />
        <Items data={this.state.filteredItems} />   <br />
      </div>
    );
  }
}

export default ItemList;