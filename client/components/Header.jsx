import React from 'react';
import Link from './_TopLink';

import keyify from '../js/keyify';
import strings from '../json/Header.json';

class Header extends React.Component {
    render() {
        let underName = keyify(strings.underName.map(x => <h4><Link to={x.link}>{x.text}</Link></h4>))
        return <div id="Header">
            <Link to="/">
                <h1>{strings.name}</h1>
            </Link>
            <div id="under-name">
                {underName}
            </div>
        </div>
    }
}

export default Header;