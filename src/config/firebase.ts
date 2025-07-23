import config from "./config";
import admin, { ServiceAccount } from 'firebase-admin'

const connectToFirebase = () => {
  try {
    const serviceAccount: ServiceAccount = {
      clientEmail: config.client_email,
      privateKey: config.private_key,
      projectId: config.project_id,
    };
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
    console.log("Firebase connection established")
  } catch (error) {
    console.log(error);
  }
};

export default connectToFirebase;