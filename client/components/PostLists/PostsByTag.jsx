import React from 'react';
import PostList from './_PostList';

import { getEntriesByTag } from '../../js/contentful';
import { AllPosts as staticContent } from '../../json/PostLists.json';

class PostsByTag extends PostList {
    constructor() {
        super();
        this.staticContent = staticContent;
    }

    assignedData() {
        return { 
            header: `Posts tagged "${this.props.params.tag}"`
        }
    }

    postSource() {
        let { tag } = this.props.params
        return getEntriesByTag(tag, 'blog-post') 
    }
}

export default PostsByTag;