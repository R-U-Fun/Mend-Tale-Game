class Server {
	MTServer1() {
		//return ("http://localhost:3214");
		return ("https://mend-tale-server.onrender.com");
	}
	MTServer2() {
		//return ("http://localhost:5000");
		//return ("https://mend-tale-server1.onrender.com");
		return ("https://95fa-2402-4000-b150-57d8-bce7-175a-5a98-1531.ngrok-free.app");
	}
}

const ServerURL = new Server();
export default ServerURL;