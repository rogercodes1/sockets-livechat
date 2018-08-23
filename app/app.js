const express = require('express');
const reload = require('reload');
const io = require('socket.io')();
const app = express()


app.set('port', process.env.PORT || 8000 );
app.set('view engine', 'ejs')
app.set('views', 'app/views')

app.locals.siteTitle = 'Express and Socket.Io Demo';

app.use(express.static('app/public')); //used with ejs
app.use(require('./routes/index'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));

let server = app.listen(app.get('port'), function(){
  console.log("listening on port " + app.get('port'));
})
io.attach(server);

io.on('connection', function(socket) {
  console.log('User Connected');

  socket.on('postMessage', function(data){
    io.emit('updateMessages', data)
  });
});

reload(app);
