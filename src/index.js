import {observable,action} from 'mobx';
import React,{Component} from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

class  Store  {
    cache = {
        queue:[]
    }
}

const store = new Store();


class Bar extends Component{
    static propTypes = {
        queue: PropTypes.array
    };
     render(){
         const queue = this.props.queue;

         return <span>{queue.length}</span>
     }

}

class Foo  extends Component{
    static propTypes = {
        cache:PropTypes.object
    };

    render(){
        const cache = this.props.cache;
        return <div><Bar queue={cache.queue}></Bar></div>
    }
}


ReactDom.render(<Foo cache={store.cache} />,document.querySelector('#root'));




