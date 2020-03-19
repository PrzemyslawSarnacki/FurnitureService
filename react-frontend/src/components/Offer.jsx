import React from 'react'
import BannerAnim, { Element } from 'rc-banner-anim';
import { Icon, Button } from 'antd';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Link, withRouter } from 'react-router-dom';
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

      <BannerAnim prefixCls="banner-user">
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
            className="bg"
            style={{
              backgroundImage: `url("http://directvintage.com/wp-content/uploads/vintage-furniture-pinterest.jpg")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
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
          <a>
            <Button type="danger" size="large">
              <Link to="/items">
                  Sprawdź
                  <Icon type="right" />
                </Link>
            </Button>
          </a>
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
            className="bg"
            style={{
              backgroundImage: `url("https://www.mirjan24.pl/63303-large_default2/kanapa-korfu.jpg")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
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
            className="bg"
            style={{
              background: `url("data:image/jpeg;base64,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")`,
            }}
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
            className="bg"
            style={{
              background: `url("https://www.meble-bogart.pl/uploads/products_clear/15709/komoda-kaja---wenge25381.jpg")`,
            }}
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
