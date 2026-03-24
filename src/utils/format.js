import { default as dayjs } from 'dayjs';
import PropTypes from 'prop-types';

export const formatDate = (date) => dayjs(date).format('MMM D, YYYY h:mm A');

formatDate.propTypes = {
  date: PropTypes.string.isRequired,
};
