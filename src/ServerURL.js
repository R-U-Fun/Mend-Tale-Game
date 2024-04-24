class Server {
	MTServer1() {
		//return ("http://localhost:3214");
		return ("https://mend-tale-server.onrender.com");
	}
	MTServer2() {
		//return ("http://localhost:5000");
		//return ("https://mend-tale-server1.onrender.com");
		return ("https://53ff-2402-4000-1201-8d32-3c60-aec7-a9a2-2129.ngrok-free.app");
	}
}

const ServerURL = new Server();
export default ServerURL;