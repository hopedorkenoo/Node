const fs = require('fs');
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My Firs Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form><body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];

        //reading data in streams
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        //end of data stream with buffer
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.text', message, (err) => {
                console.log("write file done");
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });

        });

    }

    // res.setHeader('Content-Type', 'text/html');
    // res.write('<html>');
    // res.write('<head><title>My Firs Page</title></head>');
    // res.write('<body><h1>Hello from the Node.js Server</h1><body>');
    // res.write('</html>');
    // res.end();
    // console.log("end");
    // process.exit();
}

module.exports = requestHandler;