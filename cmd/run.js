var exec = require('child_process').exec;
var isSdkDirectory = require('../tools/isSdkDirectory');

function run(args) {
    if (!isSdkDirectory()) {
        return console.log('\x1b[31mError: Please run this command inside the SDK\'s folder');
    }

    var isWin = /^win/.test(process.platform),
        port = (args[1]) ? args[1] : '8080',
        cmd = 'http-server -p' + port,
        cmd2 = (isWin) ? 'start' : 'open';
        cmd2 = cmd2 + ' http://localhost:' + port + '/pluginTester/index.html';

    //Note: callback is only run on error
    exec(cmd, function(error, stdout, stderr) {
        if(error){
            console.log('error', error);
            console.log('stdout', stdout);
            console.log('stderr', stderr);
            return;
        }
    });

    console.log('Running plugin tester on port ' + port);

    exec(cmd2, function(error, stdout, stderr) {
        if(error){
            console.log('error', error);
            console.log('stdout', stdout);
            console.log('stderr', stderr);
        }
    });
}

module.exports = run;
