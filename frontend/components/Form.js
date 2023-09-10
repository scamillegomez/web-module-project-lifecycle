import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <input 
            type="text"
            placeholder='task name'
            name='name'
            value={this.props.formValues.name}
            onChange={this.props.onChange}
          />
          <button>Submit</button>
        </form>
        <button
          onClick={this.props.toggleShowCompleted}
        >
          {this.props.showCompleted ? "Hide Completed" : "Show Completed"}
        </button>
      </div>
    )
  }
}
