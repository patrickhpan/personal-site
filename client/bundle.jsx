import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, browserHistory } from 'react-router';

import routes from './routes';
import './style/master.scss';

import createConnection from './js/contentful';

let history = process.env.NODE_ENV === 'production' ?
    browserHistory :
    hashHistory;

let router = <Router 
    children={routes}
    history={history}
/>

if ('createTouch' in document)
{
    try
    {
        var ignore = /:hover/;
        for (var i=0; i<document.styleSheets.length; i++)
        {
            var sheet = document.styleSheets[i];
            for (var j=sheet.cssRules.length-1; j>=0; j--)
            {
                var rule = sheet.cssRules[j];
                if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText))
                {
                    sheet.deleteRule(j);
                }
            }
        }
    }
    catch(e){}
}

ReactDOM.render(router, document.getElementById("app-root"))