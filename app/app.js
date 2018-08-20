const express = require('express');
const reload = require('reload');
const io = require('socket.io')();
const app = express()
const dataFile = require('./data/data.json');
app.set('port', process.env.PORT || 8000 );

app.set('appData', dataFile);
app.set('view engine', 'ejs')
app.set('views', 'app/views')

app.locals.siteTitle = 'Express and Socket.Io Demo';

app.use(require('./routes/index'));

let server = app.listen(app.get('port'), ()=>{
  console.log("listening on port " + app.get('port'));
})
io.attach(server)

io.on('connection', (socket)=> {
  console.log('User Connected');

  socket.on('disconnect',()=>{
    console.log('user diconnected');
  });
});

reload(app);
