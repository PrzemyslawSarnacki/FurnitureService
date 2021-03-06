import React from 'react';
import { Modal, Row, Col } from 'antd';
// import info from './InfoModal.jsx';
import '../components/static/styles.less';
import footerInfo from './footerInfo';



class Footer extends React.Component {
    info = (modalTitle, terms) => {
        Modal.info({
            title: modalTitle,
            content: (
                <div>
                    {terms.map((term) =>
                        <p>{term}</p>
                    )}

                </div>
            ),
            iconType: 'primary',
            okType: 'primary',
            onOk() { },
        });
    };

    render() {
        var terms = [
            "1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae optio voluptatum ",
            "1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae optio voluptatum ",
            "1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae optio voluptatum ",
            "1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae optio voluptatum ",
            "1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae optio voluptatum ",
            "1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae optio voluptatum ",
        ]

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
                                    <a target="_blank" onClick={() => this.info("Jak kupować", footerInfo.howToBuy)}>Jak kupować</a>
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
                                        tel: +48 662 142 486
                                    </a>
                                </div>
                                <div>
                                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design/wiki/FAQ">
                                        email: mebleidea@op.pl
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
                                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.info("Formy płatności", footerInfo.payment)}>Formy płatności</a>
                                </div>
                                <div>
                                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.info("Koszta dostawy", footerInfo.shipping)}>Koszta dostawy</a>
                                </div>
                                <div>
                                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.info("Odbiór zamówienia", footerInfo.receipt)}>Odbiór zamówienia</a>
                                </div>
                                <div>
                                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.info("Reklamacje", footerInfo.complaints)}>Reklamacje</a>
                                </div>
                                <div>
                                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.info("Zwroty", footerInfo.returns)}>Zwroty</a>
                                </div>
                                <div>
                                    <a target="_blank" rel="noopener noreferrer" onClick={() => this.info("Regulamin", footerInfo.statute)} >Regulamin</a>
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
