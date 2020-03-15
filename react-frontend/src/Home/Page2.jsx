import React from 'react'
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Icon, Button } from 'antd';
import QueueAnim from 'rc-queue-anim';


class Page2 extends React.Component {
  render() {
    return (
    <ScrollOverPack
      id="page2"
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
          <a>
            <Button type="danger" size="large">
            {this.props.buttonName}
              <Icon type="right" />
            </Button>
          </a>
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

export default Page2
