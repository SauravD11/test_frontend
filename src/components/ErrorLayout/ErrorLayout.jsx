import React from 'react';
import PropTypes from 'prop-types';
import { Tappable } from '@vectord/components';

import styles from './ErrorLayout.module.scss';

function ErrorLayout({ title, message, actionLabel = 'Try again', actionFn }) {
  return (
    <div className={styles.root}>
      {title && <div className="h2 dark bold m-b-xxs">{title}</div>}
      <div className="m-b-xs">{message}</div>
      {actionLabel && actionFn && (
        <Tappable
          onClick={actionFn}
          className="btn btn-primary"
        >
          {actionLabel}
        </Tappable>
      )}
    </div>
  );
}

ErrorLayout.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  actionFn: PropTypes.func,
};

export default ErrorLayout;
