import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Icon, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';


export class Page3 extends React.Component {
  render() {
    return (
    <ScrollOverPack id="page3" className="content-wrapper page">
      <TweenOne
        key="image"
        className="image3 image-wrapper"
        animation={{ x: 0, opacity: 1, ease: 'easeOutQuad' }}
        style={{ transform: 'translateX(-100px)', opacity: 0 }}
      />
      <QueueAnim
        className="text-wrapper"
        key="text"
        type={this.props.isMobile ? 'bottom' : 'right'}
        leaveReverse
        style={{ top: '40%' }}
      >
        <h2 key="h2">{this.props.headerName}</h2>
        <p key="p" style={{ maxWidth: 280 }}>
        {this.props.paragraphName}
        </p>
        <div key="button">
          <a>
            <Button type="danger" size="large">
              {this.props.buttonName}
              <Icon type="right" />
            </Button>
          </a>
        </div>
      </QueueAnim>
    </ScrollOverPack>
    )
  }
}

export default Page3