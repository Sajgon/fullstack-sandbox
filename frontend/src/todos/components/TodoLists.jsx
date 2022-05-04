import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardContent, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'

const getHeaders = {
  method: "GET",
  headers: { "Content-Type": "application/json" }
}

async function getPersonalTodos() {
  const response = await fetch('http://localhost:3001/api/fetch', getHeaders)
  const result = await response.json()
  return result
}

export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    getPersonalTodos()
      .then(setTodoLists)
  }, [])

  if (!Object.keys(todoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography component='h2'>
          My Todo Lists
        </Typography>
        <List>
          {Object.keys(todoLists).map((key) => {
            const todos = todoLists[key]['todos'];
            const completed = todos.filter(todo => todo.done);

            return (<ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={`${todoLists[key].title} ( ${completed.length}/${todos.length} done)`} />
          </ListItem>)
          })}
        </List>
      </CardContent>
    </Card>
    {todoLists[activeList] && <TodoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      todoList={todoLists[activeList]}
      saveTodoList={(id, todos) => {
        const listToUpdate = todoLists[id]
        const updatedList = { ...listToUpdate, todos }
        setTodoLists({
          ...todoLists,
          [id]: updatedList
        })

        fetch(`http://localhost:3001/api/save/${id}`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedList)
        })
        .then(response => response.json())
        .then((data) => {
          // uncomment to enable serverside edits of the input (no need for this)
          // setTodoLists(data)
        })
      }}
    />}
  </Fragment>
}
