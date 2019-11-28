import React from 'react';
import './App.css';
import Task from './Task.js'

const backend = 'https://back-dot-x-elf-260403.appspot.com/'

class App extends React.Component {
  
  state = {
    todos : [],
    user: null
  }

  render(){
    return (
      
      <div className="App">
        <div className="App-header">
          
          {this.state.user == null
          ?
            <div>
                  <input type="text" 
                  placeholder="Please inform your name and hit enter" 
                  onKeyUp={(e) => this.selectUser(e)}
                  className="UserName"
                  autoFocus={true}/>
            </div>
          : 
          <div>
            <p>{this.state.user}, Welcome to this Simple To-do list!</p>
            <main>
              
              <input type="text" 
                placeholder="Add a new Task" 
                onKeyUp={(e) => this.addTask(e)}
                className="New-task"
                autoFocus={true}/>

              {this.state.todos.map(todo =>
                <Task todo={todo}
                  key={todo.id}
                  onCheck={this.onCheck}  
                  onDelete={this.onDelete}/>                
              )}
            </main>
          </div>
          }
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
        
        e.target.value = ''

        fetch(backend + '/tasks/' + this.state.user, 
          {method:'POST', body: JSON.stringify(newTask)})
          .then(x => console.log(x.status))
    }
  }

  selectUser = (e) =>{
    if('Enter' === e.key){
       this.setState(
          {
            user: e.target.value
          }
        )
        fetch(backend + '/users', 
          {method:'POST', body: JSON.stringify({user: e.target.value})})
          .then(x => console.log(x.status))
          
        this.getTasks(e.target.value);
    }
  }

  onDelete = (e) =>{  
    this.setState(
      {todos: [...this.state.todos.filter(todo => e.target.id != todo.id)]}
    )

    fetch(backend + '/tasks/' + this.state.user + '/' + e.target.id , 
          {method:'DELETE'})
          .then(x => console.log(x.status))
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

    fetch(backend + '/tasks/' + this.state.user + '/' + e.target.id , 
          {method:'PUT'})
          .then(x => console.log(x.status))    
  }

  getTasks(user){
      fetch(backend + "/tasks/" + user)
      .then(data => data.json())
      .then(data => this.setState({todos: data}))
  }
}

export default App;