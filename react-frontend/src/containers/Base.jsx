import React from 'react';
import { enquireScreen } from 'enquire-js';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';


const { Content } = Layout;

let isMobile = false;
enquireScreen((b) => {
    isMobile = b;
});

class CustomLayout extends React.Component {

    state = {
        isFirstScreen: true,
        isMobile,
    };

    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: !!b,
            });

        });
    }
    onEnterChange = (mode) => {
        this.setState({
            isFirstScreen: mode === 'enter',
        });
    }


    render() {
        return (
            <Layout className="layout">
                <Header key="header" isFirstScreen={this.state.isFirstScreen} isMobile={this.state.isMobile} />
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

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
