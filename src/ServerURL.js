class Server {
	MTServer1() {
		//return ("http://localhost:3214");
		return ("https://mend-tale-server.onrender.com");
	}
	MTServer2() {
		//return ("http://localhost:5000");
		//return ("https://mend-tale-server1.onrender.com");
		return ("https://dd0c-2402-4000-11c0-f7ec-e11e-cc14-95b3-d3f3.ngrok-free.app");
	}
}

const ServerURL = new Server();
export default ServerURL;