import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Demo(props) {
  const demoFiles = [
    {
      name: 'Task.js',
      contents:
        "import React from 'react';\nexport default function Task(props) {\n  return (\n    <div className='task'>\n      <h3>{props.value || 'Default Task Value'}</h3>\n      <button onClick={() => props.completeTask(props.ID)}>Complete</button>\n      <button onClick={() => props.deleteTask(props.ID)}>Remove</button>\n    </div>\n  );\n}\n",
    },
    {
      name: 'index.js',
      contents:
        "import React from 'react';\nimport ReactDOM from 'react-dom';\nimport App from './App';\n\nReactDOM.render(<App />, document.getElementById('root'));\n",
    },
    {
      name: 'Header.js',
      contents:
        "import React from 'react';\n\nexport default function Header() {\n  return <h1>To-Do</h1>;\n}\n",
    },
    {
      name: 'Body.js',
      contents:
        "import React from 'react';\nimport Task from './Task';\nimport Completed from './Completed';\n\nexport default class Body extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      inProgress: [],\n      complete: [],\n    };\n    this.handleSubmit = this.handleSubmit.bind(this);\n    this.completeTask = this.completeTask.bind(this);\n    this.deleteTask = this.deleteTask.bind(this);\n  }\n\n  handleSubmit(e) {\n    e.preventDefault();\n    const tempTaskList = this.state.inProgress;\n    tempTaskList.push(e.target[0].value);\n    this.setState({ inProgress: tempTaskList });\n    console.log(this.state.inProgress);\n  }\n\n  completeTask(id) {\n    const inProgressTemp = this.state.inProgress;\n    const completeTemp = this.state.complete;\n    completeTemp.push(inProgressTemp[id]);\n    inProgressTemp.splice(id, 1);\n    this.setState({ inProgress: inProgressTemp });\n    this.setState({ complete: completeTemp });\n  }\n\n  deleteTask(id) {\n    const inProgressTemp = this.state.inProgress;\n    inProgressTemp.splice(id, 1);\n    this.setState({ inProgress: inProgressTemp });\n  }\n\n  render() {\n    const inProgressTasks = [];\n    for (let i = 0; i < this.state.inProgress.length; i += 1) {\n      inProgressTasks.push(\n        <Task\n          value={this.state.inProgress[i]}\n          ID={i}\n          completeTask={this.completeTask}\n          deleteTask={this.deleteTask}\n        />\n      );\n    }\n    const completedTasks = [];\n    for (let i = 0; i < this.state.complete.length; i += 1) {\n      completedTasks.push(<Completed value={this.state.complete[i]} />);\n    }\n    return (\n      <div>\n        <form onSubmit={this.handleSubmit}>\n          <input type='text' placeholder='add a new task...' />\n          <input type='submit' value='Add task' />\n        </form>\n        <br />\n        <h2>Tasks in Progress</h2>\n        <br />\n        {inProgressTasks.length > 0 ? inProgressTasks : <b>Add a task!</b>}\n        <br />\n        <h2>Tasks Completed</h2>\n        <br />\n        {completedTasks.length > 0 ? completedTasks : <b>Complete a task!</b>}\n      </div>\n    );\n  }\n}\n",
    },
    {
      name: 'Completed.js',
      contents:
        "import React from 'react';\nexport default function Completed(props) {\n  return (\n    <div className='task'>\n      <h3>{props.value || 'Default Task Value'}</h3>\n    </div>\n  );\n}\n",
    },
    {
      name: 'App.js',
      contents:
        "import Header from './Header';\nimport Body from './Body';\nimport React from 'react';\n\nfunction App() {\n  return (\n    <div className='App'>\n      <Header />\n      <Body />\n    </div>\n  );\n}\n\nexport default App;\n",
    },
  ];
  const handleDemo = () => {
    axios.get('/fs/demo');
    props.useUsername('demo');
    props.useFilesArr(demoFiles);
  };
  return (
    <div className='Demo'>
      <a onClick={handleDemo}>Link to demo</a>
    </div>
  );
}
