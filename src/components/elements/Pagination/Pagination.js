import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import style from './styles.module.css';

export default function Pagination({ currentPage, setCurrentPage, hasNext, hasPrev, totalPages, show }) {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (selectedPage) => setCurrentPage(selectedPage);

  useEffect(() => {
    if (hasNext) setCanGoNext(true);
    else setCanGoNext(false);
    if (hasPrev) setCanGoBack(true);
    else setCanGoBack(false);
  }, [hasNext, hasPrev]);

  if (show)
    return (
      <div className={style.root}>
        <div>
          Halaman <strong>{currentPage}</strong> dari <strong>{totalPages}</strong>
        </div>
        <div className={style.buttonGroup}>
          <Button
            onClick={() => {
              onPageSelect(1);
            }}
            disabled={!canGoBack}
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </Button>
          <Button onClick={() => onPrevPage()} disabled={!canGoBack}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
          <input
            type="number"
            className={style.inputPage}
            value={currentPage}
            min={1}
            max={totalPages}
            onChange={(e) => {
              if (e.target.value > totalPages) {
                onPageSelect(totalPages);
              } else {
                onPageSelect(parseInt(e.target.value, 10));
              }
            }}
          />
          <Button onClick={() => onNextPage()} disabled={!canGoNext}>
            <FontAwesomeIcon icon={faAngleRight} />
          </Button>
          <Button
            onClick={() => {
              onPageSelect(totalPages);
            }}
            disabled={!canGoNext}
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </Button>
        </div>
      </div>
    );
}

Pagination.defaultProps = {
  show: true
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  hasNext: PropTypes.bool,
  hasPrev: PropTypes.bool,
  totalPages: PropTypes.number,
  show: PropTypes.bool
};
