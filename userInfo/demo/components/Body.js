import React from 'react';
import Task from './Task';
import Completed from './Completed';

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgress: [],
      complete: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const tempTaskList = this.state.inProgress;
    tempTaskList.push(e.target[0].value);
    this.setState({ inProgress: tempTaskList });
    console.log(this.state.inProgress);
  }

  completeTask(id) {
    const inProgressTemp = this.state.inProgress;
    const completeTemp = this.state.complete;
    completeTemp.push(inProgressTemp[id]);
    inProgressTemp.splice(id, 1);
    this.setState({ inProgress: inProgressTemp });
    this.setState({ complete: completeTemp });
  }

  deleteTask(id) {
    const inProgressTemp = this.state.inProgress;
    inProgressTemp.splice(id, 1);
    this.setState({ inProgress: inProgressTemp });
  }

  render() {
    const inProgressTasks = [];
    for (let i = 0; i < this.state.inProgress.length; i += 1) {
      inProgressTasks.push(
        <Task
          value={this.state.inProgress[i]}
          ID={i}
          completeTask={this.completeTask}
          deleteTask={this.deleteTask}
        />
      );
    }
    const completedTasks = [];
    for (let i = 0; i < this.state.complete.length; i += 1) {
      completedTasks.push(<Completed value={this.state.complete[i]} />);
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='add a new task...' />
          <input type='submit' value='Add task' />
        </form>
        <br />
        <h2>Tasks in Progress</h2>
        <br />
        {inProgressTasks.length > 0 ? inProgressTasks : <b>Add a task!</b>}
        <br />
        <h2>Tasks Completed</h2>
        <br />
        {completedTasks.length > 0 ? completedTasks : <b>Complete a task!</b>}
      </div>
    );
  }
}
