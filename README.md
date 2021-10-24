# portScanner
 A port scanner is a program which receives a bunch of hosts and ports, and says which ports are open, and which are closed.

input file format: 
hostName port
hostName port
...

run with:
node portScanner.js -i <inputFilePath>

Options:
  -i, --input <path>  input file for portScanner
  -j, --json          get output as json format
  -p, --ip <ver>      use the ip version if exist (default: "ipV4")
  -h, --help          display help for command
