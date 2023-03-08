let users = {};


module.exports = (socket) => {
  console.log("A user connected");
  

  socket.emit("socketConnect", {});

  //registrar un usuario, ejemplo
  socket.on("registerUser", (data) => {
    console.log(data.nombre);
    users[socket.id].nickname = data.nombre;
    console.log(users[socket.id].num + " " + users[socket.id].nickname);
  });

  //Creamos y conectamos a un room
  socket.on("crearSala", (data) => {
    socket.join(data.nombre);
    socket.room = data.nombre;
    let server = socket.server;
    server.to(data.nombre).emit("SalaCreada", socket.room);
    users[socket.id] = {}
    users[socket.id].nick = data.nickname
  });

  socket.on("abandonarSala", (data) => {
    socket.leave(socket.room);
    let server = socket.server;
    server.to(socket.room).emit("PlayerLeaveRoom", users[socket.id].nick);
    socket.room = "";
  });

  socket.on("JoinRoom", (data)=>{
    socket.join(data.nombre);
    socket.room = data.nombre;
    let server = socket.server;
    server.to(data.nombre).emit("PlayerJoin", data.nickname);
    users[socket.id] = {}
    users[socket.id].nick = data.nickname
  })

  socket.on("disconnect", (data) => {
    console.log("usuario desconectado");
  });
};
