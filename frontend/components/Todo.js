import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <div style={{display: "block"}}>
        <div style={{display: "flex"}}>
          <h2>{this.props.item.name}</h2>
          <input 
            type="checkbox" 
            name="completed"
            checked={this.props.item.completed}
            onChange={()=>this.props.onCheck(this.props.item.id)}
          />
        </div>
        <p>{this.props.item.completed === false ? "incomplete" : "complete"}</p>
      </div>
    )
  }
}
