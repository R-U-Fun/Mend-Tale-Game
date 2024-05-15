class Server {
	MTServer1() {
		//return ("http://localhost:3214");
		return ("https://mend-tale-server.onrender.com");
	}
	MTServer2() {
		//return ("http://localhost:5000");
		//return ("https://mend-tale-server1.onrender.com");
		return ("https://107e-2402-4000-b1c0-1966-346b-df3f-82cb-6e49.ngrok-free.app");
	}
}

const ServerURL = new Server();
export default ServerURL;