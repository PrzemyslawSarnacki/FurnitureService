import React from 'react'
import { Tag, List, Avatar } from 'antd';
import { orderItemDeleteURL } from '../constants';


class OrderPreview extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        const { data } = this.props;
        console.log(data)
        return (
            <div style={{ textAlign: "center", position: "relative"}}>
            <React.Fragment >
                {data && (
            <React.Fragment>
                    <React.Fragment>
                        <List itemLayout="horizontal" dataSource={data.order_items} renderItem={orderItem => (
                            <List.Item style={{display: "block", marginLeft:"auto", marginRight:"auto"}}>
                                <div style={{textAlign:"200px", left: "50%"}}>
                                <List.Item.Meta
                                    
                                    avatar={<Avatar src={`http://127.0.0.1:8000${orderItem.item.image}`} />}
                                    title={
                                        `${orderItem.quantity} x ${orderItem.item.title}`
                                    }
                                    description={<Tag  color="magenta">{orderItem.final_price} zł</Tag>}
                                    />

                                    </div>
                            </List.Item>
                            
                            )}
                            />
                    </React.Fragment>
               
                <List.Item>
                        
                <List.Item.Meta
                    title={`Order Total: ${data.total} zł`}
                    // description={{data.coupon && (
                    //     <Tag color="magenta">
                    //     Current coupon: {data.coupon.code} for $
                    //     {data.coupon.amount}
                    //     </Tag>
                    //     )}}
                    />
                </List.Item>    
                   
               </React.Fragment>
               )}

            </React.Fragment>
            </div>
        )

    }
}

export default OrderPreview
