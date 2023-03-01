import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Loader.module.scss';

const NUM_LINES = 4;

function Loader({ color = 'primary' }) {
  return (
    <div className={styles.root}>
      <div className={styles.loader}>
        {new Array(NUM_LINES).fill(0).map((_, index) => (
          <div
            key={index}
            className={classNames(styles.line, styles[color])}
          />
        ))}
      </div>
    </div>
  );
}

Loader.propTypes = {
  color: PropTypes.oneOf(['light', 'primary']),
};

export default Loader;
