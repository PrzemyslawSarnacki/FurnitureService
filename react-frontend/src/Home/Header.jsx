import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Menu, Row, Col, Icon, Button, Popover, Badge } from 'antd';
import { Link, animateScroll as scroll } from "react-scroll";


const searchEngine = 'Google';

export default class Header extends React.Component {
  static propTypes = {
    isFirstScreen: PropTypes.bool,
    isMobile: PropTypes.bool,
  }
  state = {
    menuVisible: false,
  };
  onMenuVisibleChange = (visible) => {
    this.setState({
      menuVisible: visible,
    });
  }
  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  }

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  }

  handleSelectFilter = (value, option) => {
    const optionValue = option.props['data-label'];
    return optionValue === searchEngine ||
      optionValue.indexOf(value.toLowerCase()) > -1;
  }

  render() {
    const { isFirstScreen, isMobile } = this.props;
    const { menuVisible } = this.state;
    const menuMode = isMobile ? 'inline' : 'horizontal';
    const headerClassName = classNames({
      clearfix: true,
      'home-nav-white': !isFirstScreen,
    });

    const menu = [
      <Menu mode={menuMode} defaultSelectedKeys={['home']} id="nav" key="nav">
          <Link
          activeClass="active"
          to="offer"
          spy={true}
          smooth={true}
          offset={-70}
          duration= {500}
          >
        <Menu.Item key="home">
          Oferta
        </Menu.Item>
          </Link>
          <Link
          to="footer"
          spy={true}
          smooth={true}
          offset={-70}
          duration= {500}
          >
        <Menu.Item key="docs/spec">
          Kontakt
        </Menu.Item>
          </Link>
        <Menu.Item key="docs/react">
          Lokalizacja
        </Menu.Item>
        <Menu.Item key="docs/pattern">
          Sklep
        </Menu.Item>
        <Menu.Item key="docs/resource">
          Sth else
        </Menu.Item>
      </Menu>,
    ];

    return (
      <header id="header" className={headerClassName}>
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            />
          </Popover>
        ) : null}
        <Row>
          <Col lg={4} md={5} sm={24} xs={24}>
            <a id="logo">
              <span>
              <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
                <h2 key="h2"><p>MEBLE</p>idea</h2></span>
            </a>
          </Col>
          <Col lg={20} md={19} sm={0} xs={0}>
            {menuMode === 'horizontal' ? menu : null}
          </Col>
        </Row>
      </header>
    );
  }
}
