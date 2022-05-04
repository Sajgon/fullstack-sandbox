import React, { useState } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import AddIcon from '@mui/icons-material/Add'

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const [todos, setTodos] = useState(todoList.todos)

  return (
    <Card sx={{margin: '0 1rem'}}>
      <CardContent>
        <Typography component='h2'>
          {todoList.title}
        </Typography>
        <form style={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
          {todos.map((obj, index) => (
            <div key={index} style={{display: 'flex', alignItems: 'center'}}>
              <Typography sx={{margin: '8px'}} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{flexGrow: 1, marginTop: '1rem'}}
                label={obj.done ? 'Done!' : 'What to do?'}
                value={obj.name}
                onChange={event => {
                  const updatedTodos = [
                    ...todos.slice(0, index),
                    {
                      name: event.target.value,
                      done: obj.done
                    },
                    ...todos.slice(index + 1)
                  ]
                
                  setTodos(updatedTodos)

                  // Update db
                  saveTodoList(todoList.id, updatedTodos)
                }}
              />
              <Button
                sx={{margin: '8px'}}
                size='small'
                color='secondary'
                onClick={() => {
                  console.log('TOGGLE check', obj)
                  const updatedTodos = [
                    ...todos.slice(0, index),
                    {
                      name: obj.name,
                      done: !obj.done
                    },
                    ...todos.slice(index + 1)
                  ]
                  setTodos(updatedTodos)
  
                  // Update db
                  saveTodoList(todoList.id, updatedTodos)
                }}
              >
                {obj.done ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </Button>
              <Button
                sx={{margin: '8px'}}
                size='small'
                color='secondary'
                onClick={() => {
                  const updatedTodos = [ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ]
                  setTodos(updatedTodos)

                  // Update db
                  saveTodoList(todoList.id, updatedTodos)
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, {name: '', done: false}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
