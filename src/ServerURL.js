class Server {
	MTServer1() {
		return ("http://localhost:3214");
		//return ("https://mend-tale-server1.onrender.com");
	}
	MTServer2() {
		return ("http://localhost:5000");
		//return ("https://mend-tale-server1.onrender.com");
	}
}

const ServerURL = new Server();
export default ServerURL;
