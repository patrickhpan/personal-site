import React from 'react';
import { Link } from 'react-router';

import Strings from '../json/strings.json';

class HelloWorld extends React.Component {
    render() {
        return <div className="HelloWorld">
            {Strings.HelloWorld.body}
            <br />
            <Link to="/about">{Strings.HelloWorld.link}</Link>
        </div>
    }
}

export default HelloWorld;