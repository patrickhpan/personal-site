import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import flatten from 'array-flatten';

import keyify from '../js/keyify';
import images from '../img/_images';
import defaultFooter from '../json/SectionFooter.json'

class Content extends React.Component {
    render() {
        let limit = this.props.limit;
        let id = this.props.id;

        let { header, content, footer, defaultLength } = this.props.data;
        
        if(limit === true) {
            if(defaultLength !== undefined) {
                content = [...content.slice(0, defaultLength), footer]
            } else {
                content = [...content, footer]
            }
        } else if (!isNaN(limit)) {
            content = [...content.slice(0, limit), footer]
        } else {
            content = [...content, defaultFooter]
        }
        let renderedContent = renderContent(content);
        let href = `/${id}`

        return <div id={id} className="Portfolio">
            <Link to={href}><h2>{header}</h2></Link>
            {renderedContent}
        </div>
    }
}

function renderItem(item) {
    let md = item.md;
    let img = item.img;
    let link = item.link;

    let renderedMD = {
        __html: marked(md)
    };

    let toReturn = [];

    if(img) {
        toReturn.push(<img
            className="content-img"
            src={images[item.img]} 
        />)
    }

    if(link) {
        if(/^h/.test(link)) {
            toReturn.push(<a 
                href={link}
                className="content-md"
                dangerouslySetInnerHTML={renderedMD}
            />);
        } else {
            toReturn.push(<Link 
                to={link}
                className="content-md"
                dangerouslySetInnerHTML={renderedMD}
            />);
        }
    } else {
        toReturn.push(<div
            className="content-md" 
            dangerouslySetInnerHTML={renderedMD}
        />);
    }

    return toReturn;
}

function renderContent(content, wrap = true) {
    let renderedItems = flatten(content.map(renderItem));
    if(wrap) {
        return <div
            className="content-container"
        >
            {keyify(renderedItems)}
        </div> 
    }
    return renderedItems;
}



export default Content;
export { renderContent, renderItem }