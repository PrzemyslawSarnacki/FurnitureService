import React from 'react'
import { Tag, List, Avatar, Divider } from 'antd';
import { orderItemDeleteURL } from '../constants';


class OrderPreview extends React.Component {




    render() {
        const { data } = this.props;
        console.log(data)
        return (
    
    
    
    <React.Fragment >
    
                {data.length == 0 ? null :

                    (

                        <React.Fragment>
                            <React.Fragment >
                                {data.order_items.map((orderItem) => {
                                    return (

                                        <React.Fragment style={{ textAlign: "center",}}>

                                            <Avatar src={`http://127.0.0.1:8000${orderItem.item.image}`} />
                                            <div style={{ textAlign: "center", marginTop: "10px" }}>

                                                <b>{orderItem.quantity} x {orderItem.item.title}</b>
                                            
                                                <p><Tag style={{ marginTop: "10px" }} color="magenta">{orderItem.final_price} zł</Tag></p>
                                            </div>
                                            <Divider />
                                        </React.Fragment>
                                    )


                                })
                                }


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
        )

    }


}

export default OrderPreview
