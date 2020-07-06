import { testApi } from './service';
import styles from './index.less';

export default () => {
  const test = async () => {
    const result = await testApi();
  };
  return (
    <div className={styles.test}>
      <a onClick={test}>api test</a>
    </div>
  );
};
