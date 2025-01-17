import PropTypes from 'prop-types';

function ErrorNotification({ message }) {
    return <p style={{ color: 'red' }}>{message}</p>;
}

ErrorNotification.propTypes = {
    message: PropTypes.string.isRequired,
};

export default ErrorNotification;

