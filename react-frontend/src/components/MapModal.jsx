import React from 'react'
import { Modal, Button } from 'antd';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapModal extends React.Component {
  constructor(props) {
    super(props);
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
            <Button key="back" onClick={this.props.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={this.props.loading} onClick={this.props.handleOk}>
              Submit
            </Button>,
          ]}
        >

          <div style={{ width: "auto", height: 400 }}>
            <Map google={this.props.google} zoom={14}
              style={{ width: 400, height: 400 }}
            >
              <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

              <InfoWindow onClose={this.onInfoWindowClose}>
                <div>
                  <h1>{"Łomża"}</h1>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </Modal>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo")
})(MapModal);