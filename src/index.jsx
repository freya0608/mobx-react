// import {observable,action} from 'mobx';
// import React,{Component} from 'react';
// import ReactDom from 'react-dom';
// import PropTypes from 'prop-types';
// import { observer, PropTypes as ObservablePropTypes} from 'mobx-react'
//
//
// class  Store  {
//    @observable cache = {
//         queue:[]
//    }
//    @action.bound refresh(){
//        this.cache.queue.push(1);
//    }
// }
//
// const store = new Store();
//
// @observer
// class Bar extends Component{
//     static propTypes = {
//         queue: ObservablePropTypes.observableArray
//     };
//      render(){
//          const queue = this.props.queue;
//
//          return <span>{queue.length}</span>
//      }
//
// }
//
// class Foo  extends Component{
//     static propTypes = {
//         cache:ObservablePropTypes.observableObject
//     };
//
//     render(){
//         console.log('hshhs');
//
//         const cache = this.props.cache;
//         return <div><button onClick={this.props.refresh}>refresh</button><Bar queue={cache.queue}>hhh</Bar></div>
//     }
// }
//
//
// ReactDom.render(<Foo cache={store.cache} refresh={store.refresh}/>,document.querySelector('#root'));
//
//
//
//



import {observable,action,computed} from 'mobx';
import React,{Component,Fragment} from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { observer, PropTypes as ObservablePropTypes} from 'mobx-react';


class Todo {
    id = Math.random();
    @observable title = '';
    @observable finished = false;


    constructor(title){
        this.title = title;
    }
}
class Store {
    @observable todos = [];
    @action.bound createTodo(title){
        this.todos.unshift(new Todo(title));
    }


    @computed get left(){
        return this.todos.filter(todo => !todo.finished).length;
    }
}

var store = new Store();

@observer
class TodoItem extends Component {
    static propTypes = {
        todo:propTypes.shape({
            id:PropTypes.number.isRequired,
            title:PropTypes.string.isRequired,
            finished:PropTypes.bool.isRequired,
        }).isRequired

    };
    render(){
        const todo  = this.props.todo;
        return <div></div>
    }

}


@observer
class TodoList extends Component{
    static propTypes = {
        store:PropTypes.shape({
            createTodo:PropTypes.func,
            todos:ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired,
        }).isRequired
    };

    state = {inputValue: ''};

    handleSubmit = (e) =>{
        e.preventDefault();
        var store = this.props.store;
        var inputValue = this.state.inputValue;

        store.createTodo(inputValue);

        this.setState({
            inputValue:''
        })

    };
    handleChange = (e)=>{
        var inputValue = e.target.value;
        this.setState({
            inputValue,
        })

    };
    render(){
        const store = this.props.store;
        const todos = store.todos;
        return <div className="todo-list">
                    <header>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" onChange={this.handleChange}
                                   value={this.state.inputValue}
                                   className="input"
                                   placeholder="what needs to be finished"
                            />
                        </form>
                    </header>
                    <ul>
                        {
                            todos.map(todo=>{
                                return <li key={todo.id} className="todo-item">
                                    <TodoItem todo={todo}/>
                                </li>

                            })
                        }
                    </ul>
                    <footer>{store.left} item(s) unfinished</footer>
             </div>
    }

}


ReactDom.render(< TodoList store={store}/>,document.querySelector('#root'));