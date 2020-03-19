import React from "react";
import { List, Avatar, Icon } from "antd";

const IconText = ({ type, text }) => (
  <span>
    <Icon
      type={type}
      style={{
        marginRight: 8
      }}
    />
    {text}
  </span>
);

const Items = props => {
  return (
    <List
    style={{marginTop: "100px" }}  
    itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3
      }}
      dataSource={props.data}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText type="star-o" text="156" />,
            <IconText type="like-o" text="156" />,
            <IconText type="message" text="2" />
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src={item.image}
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.image} />}
            title={<a href={`/items/${item.id}`}> {item.title} </a>}
            description={item.description}
          />
          {item.content}
        {item.category}
        <p><b>Price:  </b>{item.price}</p>
        {item.label}
        

        </List.Item>
      )}
    />
  );
};

export default Items;