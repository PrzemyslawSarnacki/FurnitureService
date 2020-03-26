import React from 'react'
import { Modal, Button, Card} from 'antd';
import axios from "axios";
import { connect } from "react-redux";


class DetailModal extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
    item: {},
  }
  }

  componentDidMount() {
    const itemID = this.props.itemID;
    axios.get(`http://127.0.0.1:8000/api/products/${itemID}`).then(res => {
      this.setState({
        item: res.data
      });
    });
  }

  render() {
    return (
      <div>
        <Modal
          visible={this.props.visible}
          title="Lokalizacja"
          onOk={this.props.handleOk}
          onCancel={this.props.handleCancel}
          footer={[

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
          </Card>,

            <Button key="back" onClick={this.props.handleCancel}>
              Wróć
            </Button>,
            <Button key="submit" type="danger" loading={this.props.loading} onClick={this.props.handleOk}>
                Pełny ekran
            </Button>,
          ]}
        >
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(DetailModal);