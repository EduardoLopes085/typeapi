const crypto = require('crypto');

//importação do fastify 
const fastify = require('fastify');

//criação do servidor
const server = fastify({
    logger: true

});

const courses = [
    {id: '1', title : 'Curso de Node.js'},
    {id: '2', title : 'Curso de React'},
    {id: '3', title : 'Curso de React Native'},
]

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


server.listen({port:3333}).then(
    () =>{
    console.log('HTTP server is running!');
});






