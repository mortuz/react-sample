import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import axios from 'axios'

import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }

    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(({ data }) => {
        this.setState({ todos: data })
      })
      .catch((err) => {
        alert('Unable to fetch data')
      })
  }

  async loadMore() {
    try {
      let { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')

      const oldTodos = this.state.todos
      const newTodos = [...oldTodos, ...data]
      this.setState({ todos: newTodos })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { todos } = this.state
    console.log(todos)
    return (
      <Container>
        <div className="App">
          {todos.map((todo) => (
            <Alert key={todo.id} variant={todo.completed ? 'danger' : 'info'}>
              {todo.title}
            </Alert>
          ))}
        </div>
        <Button onClick={this.loadMore}>Load More</Button>
      </Container>
    )
  }
}

export default App
