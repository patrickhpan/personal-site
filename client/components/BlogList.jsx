import React from 'react';
import Content from './_Content';

import { getNewestEntries } from '../js/contentful';
import staticContent from '../json/BlogList.json';

class BlogList extends React.Component {
    constructor() {
        super();
        this.state = {
            content: []
        }
    }
    componentDidMount() {
        getNewestEntries(data => {
            this.setState({
                content: data.items
            })
        }, 'blog-post');
    }
    processBlogPost(post) {
        let { title, blurb } = post.fields;
        let slug = title.split(" ").slice(0, 6).join("-").toLowerCase();
        return {
            md: `**${title}**: ${blurb}`,
            link: `/blog/${slug}`
        }
    }
    render() {
        if(this.state.content.length == 0) {
            return null;
        }

        let content= this.state.content.map(this.processBlogPost)

        let data = staticContent
        data.content = content;
        
        let limitProps = this.props.limit ? 
            { limit: this.props.limit } :
            {}; 

        return <Content
            data={data}
            {...limitProps}  
        />
    }
}

export default BlogList