import React from 'react';
import Content from '../_Content';

import { getNewestEntries } from '../../js/contentful';
import { AllPosts as staticContent } from '../../json/PostLists.json';

class PostList extends React.Component {
    constructor() {
        super();
        this.state = {
            content: []
        }
        this.staticContent = staticContent;
        this.elementId = "PostList";
    }

    postFilter(post) {
        return true;
    }

    postSource() {
        return getNewestEntries('blog-post');
    }

    assignedData() {
        return {};
    }

    componentDidMount() {
        this.postSource()
            .then(data => {
                return data.items.filter(this.postFilter)
            })
            .then(items => {
                console.log(items)
                this.setState({
                    content: items
                })
            })
    }

    processPost(post) {
        let { title, blurb, slug } = post.fields;
        return {
            md: `**${title}**: ${blurb}`,
            link: `/posts/${slug}`
        }
    }
    
    render() {
        let content= this.state.content.map(this.processPost)

        let data = this.staticContent;
        data = Object.assign({}, data, { content }, this.assignedData())
        
        let elementId = this.elementId;

        return <Content
            {...this.props}
            data={data}  
            elementId={elementId}
        />
    }
}

export default PostList