import React from 'react';
import PostList from './_PostList';

import { getNewestEntries } from '../../js/contentful';
import { BlogPosts as staticContent } from '../../json/PostLists.json';

class BlogPosts extends PostList {
    constructor() {
        super();
        this.staticContent = staticContent;
    }

    postFilter(post) {
        console.log(post)
        return (post.fields.isProject === false)
    }
}

export default BlogPosts;