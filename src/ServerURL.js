class Server {
	MTServer1() {
		//return ("http://localhost:3214");
		return ("https://mend-tale-server.onrender.com");
	}
	MTServer2() {
		//return ("http://localhost:5000");
		//return ("https://mend-tale-server1.onrender.com");
		return ("https://eaf0-2402-4000-2181-a2eb-54a9-85-dfc8-3127.ngrok-free.app");
	}
}

const ServerURL = new Server();
export default ServerURL;