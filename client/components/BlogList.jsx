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
        getNewestEntries('blog-post')
            .then(data => {
                this.setState({
                    content: data.items
                })
            })
    }
    processBlogPost(post) {
        let { title, blurb, slug } = post.fields;
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

        return <Content
            {...this.props}
            data={data}  
        />
    }
}

export default BlogList