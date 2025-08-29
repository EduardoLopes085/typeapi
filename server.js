const crypto = require('crypto');

//importação do fastify 
const fastify = require('fastify');

//criação do servidor
//uma variável recebe a classe fastify para ter acesso a todos os seus métodos
const server = fastify({
    logger: true //o fastify pode receber parametros para ativar funcionalidades 

});

const courses = [
    {id: '1', title : 'Curso de Node.js'},
    {id: '2', title : 'Curso de React'},
    {id: '3', title : 'Curso de React Native'},
]


//criação de rotas, a variavel principal utiliza o método de requisição HTTP
//dentro de sua função pode receber dois parametros
//o primeiro parametro se da a "rota", o segundo uma arrow function call back a se execultada
server.get('/courser', () =>{
    return courses
})


server.post('/courser', (request, reply)=>{
    courseID = crypto.randomUUID()
    
    courses.push({
        id: courseID, 
        title: 'Novo Curso'
    })

    return reply.status(201).send({ courseID })
});


//configuração do servidor. 
//a variável principal que contém todos os métodos do fastify
//ela usa o métodolisten que recebe um parametro da porta
//o then execulta a arrow function call back quando a promisse for concluída 

server.listen({port:3333}).then(
    () =>{
    console.log('HTTP server is running!');
});






