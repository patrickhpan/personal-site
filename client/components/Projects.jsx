import React from 'react';
import Content from './_Content';

import { getNewestEntries } from '../js/contentful';
import staticContent from '../json/Projects.json';

class Projects extends React.Component {
    constructor() {
        super();
        this.state = {
            content: []
        }
    }
    componentDidMount() {
        getNewestEntries('blog-post')
            .then(data => {
                let items = data.items;
                items = items.filter(item => item.fields.isProject === true)
                return items;
            })
            .then(items => {
                this.setState({
                    content: items
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
        let content= this.state.content.map(this.processBlogPost)

        let data = staticContent;
        data.content = content;

        return <Content
            {...this.props}
            data={data}
            elementId="Projects"
        />
    }
}

export default Projects