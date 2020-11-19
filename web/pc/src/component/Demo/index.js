import { useState, useCallback } from 'react';
import { testApi } from './service';
import styles from './index.less';

export default () => {
  const [data, setData] = useState({ timer: 0 });
  const test = useCallback(async () => {
    const result = await testApi();
    if (result.success) {
      setData({
        ...result,
        timer: data.timer + 1,
      });
    }
  }, [data.timer]);
  return (
    <div className={styles.test}>
      <a onClick={test}>api test</a>
      <div>{JSON.stringify(data, '', 10)}</div>
    </div>
  );
};
