'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');
const ejs = require('ejs');
const fs = require('fs');
const util = require('util');
const multiparty = require('multiparty');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/home', 
    handler: function (request, reply) {
        var files;
        
        fs.readdir('./public/upload/', (err, data) => {
            files = data.map(function(item){
                return item;
            })
            
            var data = {
              key: 'value',
              another: false,
              number: 10,
              func: function() {
                return this.number * 10
              }
            }
            
            //reply.view('index', { title: 'My home page' });
            reply.view('index', { title: 'My home page', data: JSON.stringify({'files': files}) });
        });
        
    }
});

server.route({
    method: 'GET',
    path:'/upload', 
    handler: function (request, reply) {
            
        let form = new multiparty.Form();
        
        //form.parse(request, function(err, fields, files) {
            //if(err) return reply(err);
           // else upload(files, reply);
          //reply.writeHead(200, {'content-type': 'text/plain'});
          //reply.write('received upload:\n\n');
          //reply.end(util.inspect({fields: fields, files: files}));
        //});
    
        //reply.view('upload', { title: 'upload' });
    }
});

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);
    
    server.views({
        engines: {
            html: ejs
        },
        relativeTo: __dirname,
        path: './app/view',
        context: {
            title: 'Node App'
        }
        //layoutPath: './app/views/layout',
    	//helpersPath: './app/views/helpers'
    });
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

//https://futurestud.io/tutorials/how-to-create-and-use-handlebars-partial-views-with-hapi