import React from 'react'
import { Tag, List, Avatar, Divider } from 'antd';
import { orderItemDeleteURL } from '../constants';


class OrderPreview extends React.Component {




    render() {
        const { data } = this.props;
        console.log(data)
        return (
    
    
    
    <React.Fragment style={{ marginBottom: "200px",}}>
    
                {data.length == 0 ? null :

                    (

                        <React.Fragment>
                            <React.Fragment >
                                {data.order_items.map((orderItem) => {
                                    return (

                                        <React.Fragment style={{ textAlign: "center",}}>

                                            <div style={{ textAlign: "center" }}>
                                            <div style={{marginRight : "45px"}}>
                                            <Avatar style={{marginRight: "10px",}} src={`http://127.0.0.1:8000${orderItem.item.image}`} />

                                                <b>{orderItem.quantity} x {orderItem.item.title}</b>

                                            </div>
                                                <p><Tag style={{ marginTop: "5px" }} color="magenta">{orderItem.final_price} zł</Tag></p>
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
