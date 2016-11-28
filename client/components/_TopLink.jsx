import React from 'react';
import { Link } from 'react-router';
import scrollToTop from '../js/scrollToTop';

class TopLink extends React.Component {
    render() {
        let props = this.props;
        let onClick = scrollToTop;
        return <Link {...props} onClick={onClick} />
    }
}

export default TopLink;