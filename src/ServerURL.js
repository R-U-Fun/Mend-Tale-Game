class Server {
	MTServer1() {
		//return ("http://localhost:3214");
		return ("https://mend-tale-server.onrender.com");
	}
	MTServer2() {
		//return ("http://localhost:5000");
		//return ("https://mend-tale-server1.onrender.com");
		return ("https://63d8-2402-4000-2200-2f30-520-de6c-9886-2aa0.ngrok-free.app");
	}
}

const ServerURL = new Server();
export default ServerURL;