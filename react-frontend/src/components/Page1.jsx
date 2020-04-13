import React from 'react';
import {Element} from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

class Page1 extends React.Component {
  render(){
    return (
      <ScrollOverPack id="page1" className="content-wrapper page">
      <TweenOne
        key="image"
        className="image1 image-wrapper"
        animation={{ x: 0, opacity: 1, ease: 'easeOutQuad' }}
        style={{ transform: 'translateX(-100px)', opacity: 0 }}
        />
      <QueueAnim
        type={this.props.isMobile ? 'bottom' : 'right'}
        className="text-wrapper"
        key="text"
        leaveReverse
        >
        <h2 key="h2">Sklep</h2>
        <p key="p" style={{ maxWidth: 310 }}>Zobacz ofertę w naszym sklepie</p>
        <div key="button">
          <a>
            <Button type="primary" size="large">
              Sprawdź
              <RightOutlined />
            </Button>
          </a>
        </div>
      </QueueAnim>
    </ScrollOverPack>
    );
}
}

export default Page1;
