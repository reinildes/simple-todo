import React from 'react'

class Task extends React.Component{

    render(){
        return(
            <div className="Task">
                <input type="checkbox"
                    onClick={(e) => this.props.onCheck(e)}
                    checked={this.props.todo.checked}
                    id={this.props.todo.id} readOnly={true}/>
                
                <input type="text" 
                    disabled="disabled" 
                    defaultValue={this.props.todo.desc}
                    className={this.props.todo.checked ? "Completed" : ""}/>

                <input type="button"
                    value="Delete"
                    onClick={(e) => this.props.onDelete(e)}
                    id={this.props.todo.id}/>
            </div>
        )
    }

}

export default Task