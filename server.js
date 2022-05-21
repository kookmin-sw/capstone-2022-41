const express = require('express');
const app = express();
const port = process.env.PORT || 8082;

const getRouter = require('./routes/get_rfid');
const postRouter = require('./routes/post_rfid');
const gettest = require('./routes/test_rfid');

app.use('/id', getRouter);
app.use('/rfid', postRouter);
app.use('/test/newtest', gettest);

app.get('/users', (req, res)=> {
    console.log('who get in /users');
    res.send("/users");
})

app.get('/', (req, res)=> {
    console.log('who get in root');
    res.send("hello root");
})

app.use((req, res, next) => {
    res.status(404).send('Nottttt Found');
});

app.listen(port, ()=>{
    console.log('Example app listening on port 8080!');
});