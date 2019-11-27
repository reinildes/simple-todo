import React from 'react';
import './App.css';
import Task from './Task.js'

class App extends React.Component {
  
  state = {
    todos : [{
            desc: 'Buy the Cooffee',
            checked: true,
            id: 1
          }]
  }

  render(){
    return (
      <div className="App">
        <div className="App-header">
          <main>
            <input type="text" 
              placeholder="Add a new Task" 
              onKeyUp={(e) => this.addTask(e)}
              className="New-task"/>

            {this.state.todos.map(todo =>
              <Task todo={todo}
                key={todo.id}
                onCheck={this.onCheck}  
                onDelete={this.onDelete}/>                
            )}
           </main>
        </div>
      </div>
    );
  }

  addTask = (e) =>{
    if('Enter' === e.key){
        const newTask = {
          desc: e.target.value,
          checked: false,
          id: new Date()*1
        }
        this.setState(
          {
            todos: [...this.state.todos, newTask]
          }
        )
    }
  }

  onDelete = (e) =>{
    this.setState(
      {todos: [...this.state.todos.filter(todo => e.target.id != todo.id)]}
    )
  }

  onCheck = (e) =>{
    let updatedTodos = this.state.todos.map(todo => {
      if(e.target.id == todo.id){
        todo.checked = !todo.checked
      }
      return todo
    })

    this.setState({
      todos: updatedTodos
    })
  }
}

export default App;
