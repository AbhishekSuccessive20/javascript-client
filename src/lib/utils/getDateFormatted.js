import moment from 'moment';

export function getDateFormatted(createdAt) {
  return (
    moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')
  );
}
