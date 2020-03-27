import React from 'react'
import { Modal, Button } from 'antd';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapModal extends React.Component {

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
              Wróć
            </Button>,
            <Button key="submit" type="danger" loading={this.props.loading} onClick={this.props.handleOk}>
              <a href="https://www.google.com/maps/place/Meble+idea/@53.1639094,22.0544312,15z/data=!4m5!3m4!1s0x0:0x85616f733b3c1f81!8m2!3d53.1639094!4d22.0544312">
                Pełny ekran
              </a>
            </Button>,
          ]}
        >

          <div style={{ width: "auto", height: 400 }}>
            <Map google={this.props.google} zoom={14}
              style={{ width: 400, height: 400 }}
              initialCenter={{
                lat: 53.1639094,
                lng: 22.0544312,
              }}
    
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