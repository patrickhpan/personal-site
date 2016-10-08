import React from 'react';
import { Link } from 'react-router';

import keyify from '../js/keyify';

class Content extends React.Component {
    renderItem(item) {
        let md = item.md;
        let link = item.link;

        let renderedMD = <ReactMarkdown
            source={md}
        />

        if(link) {
            if(/^h/.test(link)) {
                return <a href={link}>
                    {renderedMD}
                </a>
            } else {
                return <Link to={link}>
                    {renderedMD}
                </Link>
            }
        }
        return renderedMD;
    }
    render() {
        let content = this.props.content;
        if(!content) return null;

        let renderedContent = keyify(content.map(this.renderItem)); 

        return <div>
            {renderedContent}
        </div>
    }
}

export default Content;