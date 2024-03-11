import {Col, Row, Skeleton} from "antd";

export const DetailWeatherSkeleton = () => {
  return (
    <Row>
      <Col span={12}>
        <Row>
          <Skeleton active />
        </Row>
        <Row>
          <Skeleton.Image active />
        </Row>
      </Col>
      <Col span={12}>
        <Row></Row>
        <Row>
          <Skeleton
            paragraph
            active
          />
        </Row>
      </Col>
    </Row>
  );
};
