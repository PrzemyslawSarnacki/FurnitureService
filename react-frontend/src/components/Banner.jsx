import React from 'react';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import ScrollLink from 'rc-scroll-anim/lib/ScrollLink';
import { DownOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import './static/styles.less';


function typeFunc(a) {
  if (a.key === 'line') {
    return 'right';
  } else if (a.key === 'button') {
    return 'bottom';
  }
  return 'left';
}

export class Banner extends React.Component {
  render() {
    return (
      <section className="page banner-wrapper">
        <ScrollElement
          className="page"
          id="banner"
          onChange={({ mode }) => this.props.onEnterChange(mode)}
          playScale={0.9}
        >
          <QueueAnim className="banner-text-wrapper" type={typeFunc} delay={300} key="banner">
            <h2 key="h2"><p>MEBLE</p><b className="italic" >idea</b></h2>
            <p key="content"> Najtańsze meble w mieście </p>
            <span className="line" key="line" />
            <div key="button1" className="start-button clearfix">
              <a href="/">
                Oferta
              </a>
              <a href="/">
                Zakupy
              </a>
            </div>
          </QueueAnim>
          <ScrollLink
            to="offer"
          >
            <DownOutlined className="down" style={{ color: "rgba(255, 255, 255, .75)" }} />
          </ScrollLink>
        </ScrollElement>
      </section>
    );
  }
}

export default Banner