import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MenuOutlined, UpOutlined } from '@ant-design/icons';
import { Menu, Row, Col, Popover, BackTop, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import ScrollLink from 'rc-scroll-anim/lib/ScrollLink';
import { logout } from "../store/actions/auth";
import { connect } from "react-redux";
import { fetchCart } from "../store/actions/cart";



const searchEngine = 'Google';

class Header extends React.Component {
  static propTypes = {
    isFirstScreen: PropTypes.bool,
    isMobile: PropTypes.bool,
  }
  state = {
    menuVisible: false,
  };





  componentDidMount() {
    this.props.fetchCart();
  }

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
    const { isAuthenticated, cart, loading } = this.props;
    const { isFirstScreen, isMobile } = this.props;
    const { menuVisible } = this.state;
    const menuMode = isMobile ? 'inline' : 'horizontal';
    const headerClassName = classNames({
      clearfix: true,
      'home-nav-white': !isFirstScreen,
    });
    console.log(cart)

    const cartView = (
      <Menu
      //  onClick={handleMenuClick}
      >
        {cart !== null ? (
          <React.Fragment>
            {cart.order_items.map(order_item => {
              return (
                <Menu.Item key={order_item.id}>
                  {order_item.quantity} x {order_item.item.title}
                </Menu.Item>
              );
            })}
            {cart.order_items.length < 1 ? (
              <Menu.Item>Koszyk jest pusty</Menu.Item>
            ) : null}

            <Menu.Item
              icon="arrow right"
              text="Checkout"
              onClick={() =>
                this.props.history.push("/order-summary")
              }
            />
          </React.Fragment>
        ) : (
            <Menu.Item>Koszyk jest pusty</Menu.Item>
          )}

      </Menu>
    );

    const menu = [
      <Menu onClick={this.checkLocation} mode={menuMode} defaultSelectedKeys={['home']} id="nav" key="nav">
        {this.props.currentPath === "/" || this.props.currentPath === "" ?
          <Menu.Item onClick={this.handleHideMenu} key="home">
            <ScrollLink
              to="offer"
              offset={-70}
              duration={500}
            >
              Oferta
          </ScrollLink>
          </Menu.Item>
          : null}
        <Menu.Item onClick={this.handleHideMenu} key="docs/spec">
          <ScrollLink
            to="footer"
            offset={-70}
            duration={500}
          >
            Kontakt
          </ScrollLink>
        </Menu.Item>
        {this.props.currentPath === "/" || this.props.currentPath === "" ?
          <Menu.Item onClick={this.handleHideMenu} key="docs/react">
            <ScrollLink
              to="location"
              offset={-70}
              duration={500}>Lokalizacja</ScrollLink>
          </Menu.Item>
          : null}

        <Menu.Item onClick={this.handleHideMenu} key="docs/pattern">
          <Link to="/items">
            Sklep
          </Link>
        </Menu.Item>
        {cart !== null ? (
          <Menu.Item onClick={this.handleHideMenu} key="docs/resource">
            <Dropdown overlay={cartView}>

              <Link to="/items">
                Koszyk
          {cart !== null ? (
                  ` (${cart.order_items.length})`
                ) : cart}
              </Link>
            </Dropdown>
          </Menu.Item>
        )
          : null}

        {isAuthenticated ?
          <Menu.Item onClick={this.handleHideMenu} key="2" onClick={() => this.props.logout()}>
            Logout
            </Menu.Item>

          :

          <Menu.Item onClick={this.handleHideMenu} key="2">
            <Link to="/login">Login</Link>
          </Menu.Item>
        }
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
            <MenuOutlined className="nav-phone-icon" onClick={this.handleShowMenu} />
          </Popover>
        ) : null}
        <Row>
          <Col lg={4} md={5} sm={24} xs={24}>
            <Link to="/">
              <div id="logo">
                <span>
                  <h2 key="h2"><p>MEBLE</p><b className="italic" >idea</b></h2>
                </span>
              </div>
            </Link>
          </Col>
          <Col lg={20} md={19} sm={0} xs={0}>
            {menuMode === 'horizontal' ? menu : null}
          </Col>
        </Row>
        <div >

          <BackTop>
            <div style={{ color: "white", backgroundColor: "gray", height: "40px", width: "40px", fontSize: "20px", lineHeight: "40px", textAlign: "center", borderRadius: "25px" }}>
              <UpOutlined />
            </div>
          </BackTop>
        </div>

      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    cart: state.cart.shoppingCart,
    loading: state.cart.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);