//import de lib random 
const crypto = require('crypto');

//importação do fastify 
const fastify = require('fastify');

//criação do servidor
//uma variável recebe a classe fastify para ter acesso a todos os seus métodos
const server = fastify({
  //logger : true o fastify pode receber parametros para ativar funcionalidades 
    logger : {
       transport : {
        target : 'pino-pretty'
       } 
    }
});

const courses = [
    {id: '1', title : 'Curso de Node.js'},
    {id: '2', title : 'Curso de React'},
    {id: '3', title : 'Curso de React Native'},
]


//criação de rotas, a variavel principal utiliza o método de requisição HTTP
//dentro de sua função pode receber dois parametros
//o primeiro parametro se da a "rota", o segundo uma arrow function call back a se execultada
server.get('/courses', () =>{
    //retornando em objeto
    return { courses }
})

server.get('/courses/:id', (request, reply)=>{
    const { id } = request.params;
  
    const course = courses.find(course => course.id == id)

    if (course){
        return { course }
    }


    return reply.status(404).send('ítem não encontrado')
})

server.post('/courses', (request, reply)=>{
    const { title } = request.body
    const courseID = crypto.randomUUID()
    
    if(!title){
        return reply.status(202).send({message : 'Título não informado'})
    }

    courses.push({
        id: courseID, 
        title: title
    })

    return reply.status(201).send({ courseID })
    
});


//configuração do servidor. 
//a variável principal que contém todos os métodos do fastify
//ela usa o método listen que recebe um objeto para configurar determinadas opções 
//o then execulta a arrow function call back quando a promisse for concluída 
server.listen({port:3333}).then(
    () =>{
    console.log('HTTP server is running!');
});






