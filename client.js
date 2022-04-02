import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './github.proto';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

let packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const ProfileService = grpc.loadPackageDefinition(packageDefinition).ProfileService;

const client = new ProfileService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

export { client };
