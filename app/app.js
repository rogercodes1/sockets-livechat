const express = require('express');
const reload = require('reload');
const io = require('socket.io')();
const app = express()


app.set('port', process.env.PORT || 8000 );
app.set('view engine', 'ejs')
app.set('views', 'app/views')

app.locals.siteTitle = 'Express and Socket.Io Demo';

app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));

let server = app.listen(app.get('port'), ()=>{
  console.log("listening on port " + app.get('port'));
})
io.attach(server);

io.on('connection',(socket)=> {
  console.log('User Connected');

  socket.on('postMessage', (data)=>{
    io.emit('updateMessages', data)
  });
});

reload(app);
