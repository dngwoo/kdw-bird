import React from "react";
import PropTypes from "prop-types";
import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";

const FollowList = ({ header, data }) => {
  return (
    <List
      style={{ marginBottom: "10px" }}
      grid="{{gutter:16, xs:2, md:3}}"
      size="small"
      header={<div>{header}</div>}
      bordered
      dataSource={data}
      loadMore={
        <div style={{ margin: "10px 0px", textAlign: "center" }}>
          <Button>더 보기</Button>
        </div>
      }
      renderItem={(item) => (
        <List.Item>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname}></Card.Meta>
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
