import React from 'react';
import { enquireScreen } from 'enquire-js';
import { Layout} from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { logout } from "../store/actions/auth";
import { fetchCart } from "../store/actions/cart";



const { Content } = Layout;

let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});

class CustomLayout extends React.Component {

    state = {
        isFirstScreen: true,
        isMobile,
        currentPath: "",
    };

    componentDidMount(prevProps) {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });

        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({currentPath: this.props.location.pathname})
        }
      }

    onEnterChange = (mode) => {
        this.setState({
            isFirstScreen: mode === 'enter',
        });
    }


    render() {
        return (
            <Layout className="layout">
                <Header key="header" isFirstScreen={this.state.isFirstScreen} isMobile={this.state.isMobile} currentPath={this.state.currentPath}/>
                <Content >
                    <div style={{ background: '#fff', }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer key="footer" />

            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return {
      authenticated: state.token !== null,
    //   cart: state.cart.shoppingCart,
    //   loading: state.cart.loading
    };
  };  

const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(logout()),
      fetchCart: () => dispatch(fetchCart())
    };
  };  

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));
