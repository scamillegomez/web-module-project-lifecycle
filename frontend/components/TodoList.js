import React from 'react'
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    return (
      <div>
        {this.props.list.map((item,index)=>{
          return(
          <Todo item={item} onCheck={this.props.onCheck} key={item.id}/>
          );
        })}
      </div>
    )
  }
}
