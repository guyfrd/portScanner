# portScanner

<!-- ABOUT THE PROJECT -->
## About The Project

A port scanner is a program which receives a bunch of hosts and ports, and says which ports are open, and which are closed.

### Built With

* [Node.js](https://nextjs.org/)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
* node.js

### Installation
 
1. Clone the repo
   ```sh
   git clone https://github.com/guyfrd/portScanner
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

### Input format
Port scanner get input file that consist the fowling format:<br />
hostName port<br />
hostName port<br />
hostName port<br />
...
 
 example: 
```sh
duckduckgo.com 9999
localhost 8080
localhost 22
localhost 3000
google.com 80
```

## Usage

### run 
```sh
   node <path_to_repo>/portScanner.js -i <path_to_input_file>
```
### IPv6
PortScanner convert the hostname to IP address, for use the IPv6 address as default(if exist), pass the flag:
```sh
--p IPv6
```
As default, portScanner use IPv4. 

### JSON output 

portScanner will print check results along dns results and query duration, after checking all ports and hosts.<br />
get the output in JSON format by using the flag: 
```sh
--json
```
## tests

run from repo root directory:
```sh
cd tests/parserTest
node parserTest.js 
```

## Future features 

* loging
* save output to directory
* more tests
