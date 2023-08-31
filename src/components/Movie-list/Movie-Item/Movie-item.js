import React from 'react';
import { Card, Row, Col, Tag, Typography } from 'antd';
import { format } from 'date-fns';

export default function MovieItem(props) {
  const { title, date, overview } = props;
  const { enGB } = format;
  const cutOverview = (text, maxSymb = 121) => {
    if (text.length < maxSymb) {
      return text;
    }
    const substring = text.substring(0, maxSymb - 1);
    return `${substring.slice(0, substring.lastIndexOf(' '))}...`;
  };
  const formattedDate = format(new Date(date), 'MMMM dd, yyyy', {
    locale: enGB,
  });

  const tag = 'tag';
  const { Text, Title } = Typography;
  return (
    <Card
      className="movie-list__item"
      style={{
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        height: '246',
      }}
      bodyStyle={{
        padding: 0,
      }}
    >
      <Row
        style={{
          height: '100%',
        }}
      >
        <Col
          span={10}
          style={{
            height: '100%',
          }}
        >
          <img
            alt="moviepic"
            width="100%"
            height="100%"
            src="https://news.store.rambler.ru/img/7222d314d8abaf270be4e5b51a2c80ef?img-format=auto&img-1-resize=height:350,fit:max&img-2-filter=sharpen"
          />
        </Col>
        <Col
          span={14}
          style={{
            padding: '20px',
          }}
        >
          <div
            className="movie-list__info"
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Title
              style={{
                fontSize: 20,
              }}
            >
              {title}
            </Title>
            <Text className="movie-list__date">
              {date ? formattedDate : null}
            </Text>
            <ul className="movie-list__tags">
              <Tag className="movie-list__tag">{tag}</Tag>
            </ul>
            <Text>{cutOverview(overview)}</Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
