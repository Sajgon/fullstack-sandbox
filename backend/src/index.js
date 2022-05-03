const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3001

let list = {
    '0000000001': {
      id: '0000000001',
      title: 'First List',
      todos: [{name:'First todo of first list!', done:false}]
    },
    '0000000002': {
      id: '0000000002',
      title: 'Second List',
      todos: [{name:'First todo of second list!', done:false}]
    }
}

app.get('/', (req, res) =>  res.send('Hello World!'))

app.get('/api/fetch', function (req, res) {
    console.log('/api/fetch', list)
    res.json(list)
})

app.post('/api/save/:id', function (req, res) {
    list[req.params.id] = req.body;

    res.json(list)
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
