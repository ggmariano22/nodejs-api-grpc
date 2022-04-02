import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { join, dirname } from 'path'
import {fileURLToPath} from 'url';

/* const PROTO_PATH = './github.proto'; */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROTO_PATH = join(__dirname, '/github.proto');

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

export default client;
