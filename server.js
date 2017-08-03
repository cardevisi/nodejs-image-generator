'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Hoek = require('hoek');
const fs = require('fs');
const ejs = require('ejs');

console.log('__dirname', __dirname);

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {
        var files = [];
		fs.readdir('./public/upload/', (err, data) => {
            data.forEach(function(item){

            });
			//console.log(data);


		});
		var data = {
	      key: 'value',
	      another: false,
	      number: 10,
	      func: function() {
	        return this.number * 10
	      }
	    }

        console.log(files);

        //reply.view('index', { title: 'My home page' });
        reply.view('index', { title: 'My home page', data: JSON.stringify({'files': files}) });
    }
});

const defaultContext = {
    title: 'My personal site'
};

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: ejs
        },
        relativeTo: __dirname,
        path: './app/view',
        context: defaultContext
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