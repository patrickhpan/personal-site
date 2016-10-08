import React from 'react';
import { Link } from 'react-router';

import keyify from '../js/keyify'
import strings from '../json/Landing.json';

class Landing extends React.Component {
    render() {
        let text = keyify(strings.about.map(x => <p>{x}</p>))
        return <div id="Landing">
            {text}
        </div>
    }
}

export default Landing;