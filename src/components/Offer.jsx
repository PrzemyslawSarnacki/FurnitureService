import React from 'react'
import BannerAnim, { Element } from 'rc-banner-anim';
import { RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Link } from 'react-router-dom';
import 'rc-banner-anim/assets/index.css';
const BgElement = Element.BgElement;


class Offer extends React.Component {
  render() {
    return (
      <ScrollOverPack id="offer" className="content-wrapper page">
        
        <TweenOne
        key="image"
          animation={{ x: 0, opacity: 1, ease: 'easeOutQuad' }}
          style={{ transform: 'translateX(-100px)', opacity: 0 }}
          >
        <BannerAnim prefixCls="banner-user" type="acrossOverlay">
          <Element key="aaa"
            prefixCls="banner-user-elem"
            followParallax={{
              delay: 1000,
              data: [
                { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                { id: 'title', value: 50, type: 'x' },
                { id: 'content', value: -30, type: 'x' },
              ],
            }}
          >
            <BgElement
              key="bg"
              className="bg offer-image1"
              id="bg"
              />
            <TweenOne className="banner-user-title" 
              animation={{ y: 30, opacity: 0, type: 'from' }}
              id="title"
              >
              Sprawdź
            </TweenOne>
            <TweenOne className="banner-user-text" 
              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              id="content"
              >
              Naszą Ofertę
            <div key="button" style={{marginTop: "12px"}}>
              <Button type="primary" size="large">
                <Link to="/items">
                    Sprawdź
                    <RightOutlined />
                  </Link>
              </Button>
          </div>
            </TweenOne>
            <TweenOne className="banner-user-text" 
              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              >
            </TweenOne>
          </Element>
          <Element key="bbb"
            prefixCls="banner-user-elem"
            followParallax={{
              delay: 1000,
              data: [
                { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                { id: 'title', value: 50, type: 'x' },
                { id: 'content', value: -30, type: 'x' },
              ],
            }}
            >
            <BgElement
              key="bg"
              className="bg offer-image2"
            />
            <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
              Kanapy
            </TweenOne>
          </Element>
          <Element key="ccc"
            prefixCls="banner-user-elem"
            followParallax={{
              delay: 1000,
              data: [
                { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                { id: 'title', value: 50, type: 'x' },
                { id: 'content', value: -30, type: 'x' },
              ],
            }}
            >
            <BgElement
              key="bg"
              className="bg offer-image3"
            />
            <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
              Narożniki
            </TweenOne>
          </Element>
          <Element key="ddd" 
            prefixCls="banner-user-elem"
            followParallax={{
              delay: 1000,
              data: [
                { id: 'bg', value: 20, bgPosition: '50%', type: ['backgroundPositionX'] },
                { id: 'title', value: 50, type: 'x' },
                { id: 'content', value: -30, type: 'x' },
              ],
            }}
            >
            <BgElement
              key="bg"
              className="bg offer-image4"
            />
            <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
              Meble
            </TweenOne>
            <TweenOne className="banner-user-text" 
              animation={{ y: 30, opacity: 0, type: 'from', delay: 100 }}
              >
              Twarde
            </TweenOne>
          </Element>
        </BannerAnim>
              </TweenOne>
      </ScrollOverPack>
    );
  }
}
export default Offer;
