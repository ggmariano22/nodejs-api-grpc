import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import fetch from "node-fetch";

const PROTO_PATH = './github.proto';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const profileProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(profileProto.ProfileService.service, {
  getProfile: async (_, callback) => {
	const results = await fetch(`https://api.github.com/users/${_.request.id}`);
  const profile = await results.json();
	callback(null, {profile: profile});
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);
