import React from 'react';
import { Row, Col } from 'antd';

class Footer extends React.Component {
render() {
  return (
    <footer id="footer" className="dark">
      <div className="footer-wrap">
        <Row>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Zakupy</h2>
              <div>
                <a target="_blank " href="https://github.com/ant-design/ant-design">
                  Moje konto
                </a>
              </div>
              <div>
                <a href="http://pro.ant.design">Zamówienia</a>
              </div>
              <div>
                <a href="http://mobile.ant.design">Promocje</a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Pomoc</h2>
              <div>
                <a href="http://scaffold.ant.design">Jak kupować</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva">Polityka prywatności</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva-cli">Kontakt</a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Infolinia</h2>
              <div>
                <a href="/changelog">
                  tel: +48 333 333 333
                </a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design/wiki/FAQ">
                  email: mail@mail.com
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>
                <img className="title-icon" src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg" alt="" />
                Dostawa i płatność
              </h2>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://antv.alipay.com/">Formy płatności</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">Koszta dostawy</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">Odbiór zamówienia</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">Reklamacje</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">Zwroty</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">Regulamin</a>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="bottom-bar">
        <Col lg={4} sm={24} />
        <Col lg={20} sm={24}>
          <span
            style={{
              lineHeight: '16px', paddingRight: 12, marginRight: 11, borderRight: '1px solid rgba(255, 255, 255, 0.55)',
            }}
          >
            <a
              href="https://docs.alipay.com/policies/privacy/antfin"
              rel="noopener noreferrer"
              target="_blank"
            >
              OK
            </a>
          </span>
          <span style={{ marginRight: 24 }}>
            <a
              href="https://render.alipay.com/p/f/fd-izto3cem/index.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              OK
            </a>
          </span>
          <span style={{ marginRight: 12 }}>ICP  B2-2-100257</span>
          <span style={{ marginRight: 12 }}>Copyright © </span>
        </Col>
      </Row>
    </footer>
  );
}
  }

export default Footer;
