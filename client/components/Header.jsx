import React from 'react';

import keyify from '../js/keyify';
import strings from '../json/Header.json';

class Header extends React.Component {
    render() {
        let underName = keyify(strings.underName.map(x => <h4>{x}</h4>))
        return <div id="Header">
            <h1>{strings.name}</h1>
            <div id="under-name">
                {underName}
            </div>
        </div>
    }
}

export default Header;