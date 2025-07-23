interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;

  firebaseAccountType: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI || "",

  // Firebase service json
  firebaseAccountType: process.env.FIREBASE_ACCOUNT_TYPE || "",
  project_id: process.env.FIREBASE_PROJECT_ID || "",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID || "",
  private_key: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : "",
  client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
  client_id: process.env.FIREBASE_CLIENT_ID || "",
  auth_uri: process.env.FIREBASE_AUTH_URI || "",
  token_uri: process.env.FIREBASE_TOKEN_URI || "",
  auth_provider_x509_cert_url:
    process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL || "",
  universe_domain: process.env.UNIVERSE_DOMAIN || "",
};

export default config;
