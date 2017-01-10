import React from 'react';
import Content from './_Content';

import { getNewestEntries } from '../js/contentful';
import staticContent from '../json/PostList.json';

class PostList extends React.Component {
    constructor() {
        super();
        this.state = {
            content: []
        }
        this.staticContent = staticContent;
        this.elementId = "PostList";
    }
    componentDidMount() {
        getNewestEntries('blog-post')
            .then(data => {
                let items = data.items;
                let limit = this.props.limit;
                if (limit === true || !isNaN(limit)) {
                    items = items.filter(item => !item.fields.isProject)
                }
                return items;
            })
            .then(items => {
                this.setState({
                    content: items
                })
            })
    }
    processPost(post) {
        let { title, blurb, slug } = post.fields;
        return {
            md: `**${title}**: ${blurb}`,
            link: `/posts/post/${slug}`
        }
    }
    render() {
        let content= this.state.content.map(this.processPost)

        let data = this.staticContent;
        data.content = content;
        
        let elementId = this.elementId;

        return <Content
            {...this.props}
            data={data}  
            elementId={elementId}
        />
    }
}

export default PostList