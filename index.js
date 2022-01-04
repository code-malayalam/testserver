const http = require('http');
const fs = require('fs');

const RESPONSE_TIMEOUT = 500;
http.createServer((req, res) => {
        console.log(req.url);
        try {
            const data = JSON.parse(chunk);
            console.log(data);
            
        } catch (err) {

        }
       
        setTimeout(() => {
            if(req.url === '/data') {
                fs.readFile(__dirname + "/data.json", "utf8", function(err, data) {
                    console.log(data);
                    res.writeHead(200, { 'Content-Type': 'text/json' });
                    res.write(data);
                    res.end();
                });

            } else if(req.url === '/add') {
                fs.readFile(__dirname + "/data.json", "utf8", function(err, data) {
                    req.on('data', (chunk) => {
                        
                        const pdata = JSON.parse(data);
                        const newData = [JSON.parse(chunk), ...pdata];
                        const wData = JSON.stringify(newData);

                        fs.writeFile(__dirname + '/data.json', wData, 'utf8', () => {
                            res.writeHead(200, { 'Content-Type': 'text/json' });
                            res.write(JSON.stringify('Success'));
                            res.end();
                        });
                    });
                    
                }); 

            }  else if(req.url.indexOf('/delete') !== -1) {
                fs.readFile(__dirname + "/data.json", "utf8", function(err, data) {
                    const pdata = JSON.parse(data);
                    const val = parseInt(req.url.split('/')[2]);
                    console.log('***', val);
                    const newData = pdata.filter((item) => {
                        return item.id !== val; 
                    });

                    const wData = JSON.stringify(newData);

                    fs.writeFile(__dirname + '/data.json', wData, 'utf8', () => {
                        res.writeHead(200, { 'Content-Type': 'text/json' });
                        res.write(JSON.stringify('Success'));
                        res.end();
                    });
                    
                });

            } 
            else {
                res.writeHead(400, { 'Content-Type': 'text/json' });
                    res.write("An Error Occured");
                    res.end();
            }
            
        }, RESPONSE_TIMEOUT);
}).listen(8090);
