import React from 'react'
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import MapModal from './MapModal';


class Localisation extends React.Component {
  constructor(props){
    super(props);
    this.state = { visible: false }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <ScrollOverPack
        id="Localisation"
        className="content-wrapper page"
      >
        <QueueAnim
          type={this.props.isMobile ? 'bottom' : 'left'}
          className="text-wrapper left-text"
          key="text"
          duration={450}
          type="bottom"
          leaveReverse
        >
          <h2 key="h2">{this.props.headerName}</h2>
          <p key="p" style={{ maxWidth: 260 }}>{this.props.paragraphName}</p>
          <div key="button">
              <Button type="danger" size="large" onClick={() => this.showModal()}>
                {/* <Link to="/items"> */}
                  {this.props.buttonName}
                  <RightOutlined />
                {/* </Link> */}
              </Button>
              <MapModal visible={this.state.visible} loading={this.state.loading} handleOk={this.handleOk} handleCancel={this.handleCancel}/>
          </div>
        </QueueAnim>
        <TweenOne
          key="image"
          className="image2 image-wrapper"
          animation={{ x: 0, opacity: 1, ease: 'easeOutQuad' }}
          style={{ transform: 'translateX(100px)', opacity: 0 }}
        />
      </ScrollOverPack>
    );
  }
}

export default Localisation
