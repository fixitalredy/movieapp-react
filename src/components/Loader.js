import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function Loader() {
  const antIcon = <LoadingOutlined style={{ fontSize: 55 }} spin />;
  return (
    <div>
      <Spin className="mt-2 mb-2" indicator={antIcon} />
    </div>
  );
}
