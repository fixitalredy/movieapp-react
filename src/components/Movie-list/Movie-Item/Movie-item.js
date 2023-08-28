import React from "react";
import { Card, Tag, Col, Row } from "antd";
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

  const tag = 'tag';
  const { Meta } = Card;

  return (
    <li>
      <Card
        className="movie-list__item"
        style={{
          width: '50%',
        }}
      >
        <Row gutter={[16, 16]}>
          <Col lg={8}>
            <div className="movie-list__image">
              <img
                alt="moviepic"
                src="https://news.store.rambler.ru/img/7222d314d8abaf270be4e5b51a2c80ef?img-format=auto&img-1-resize=height:350,fit:max&img-2-filter=sharpen"
              />
            </div>
          </Col>
          <Col lg={16}>
            <div className="movie-list__info">
              <Meta title={title} description={cutOverview(overview)} />
              <p className="movie-list__date">
                {format(new Date(date), 'MMMM dd, yyyy', { locale: enGB })}
              </p>
              <ul className="movie-list__tags">
                <Tag className="movie-list__tag">{tag}</Tag>
              </ul>
            </div>
          </Col>
        </Row>
      </Card>
    </li>
  );
}
