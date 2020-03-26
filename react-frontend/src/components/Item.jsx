import React, {useState}from "react";
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { List, Avatar } from "antd";
import DetailModal from "../components/DetailModal";

const IconText = ({ type, text }) => (
  <span>
    <LegacyIcon
      type={type}
      style={{
        marginRight: 8,
      }}
    />
    <b>
      {text}
    </b>
  </span>
);

const Items = props => {
  const [visible, setVisible] = useState(false)

  
  return (
    <List
    style={{marginTop: "50px" }}  
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
            <IconText type="dollar" text={`${item.price} zł`} />
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
            // title={<a href={`/items/${item.id}`}> {item.title} </a>}
            title={<a onClick={setVisible(true)}> {item.title} </a>}
            description={item.description}
          />
          <DetailModal visible={visible} itemID={item.id}/>

          {item.content}
        {item.category}
        {/* <p><b>Price:  </b>{item.price}</p> */}
        {item.label}
        

        </List.Item>
      )}
    />
  );
};

export default Items;