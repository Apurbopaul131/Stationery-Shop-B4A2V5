import dotenv from 'dotenv';
import pathModule from 'path';

//add path
dotenv.config({ path: pathModule.join(process.cwd(), '.env') });

//export
export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  NODE_ENV: process.env.NODE_ENV,
  sp: {
    sp_endpoint: process.env.SP_ENDPOINT,
    sp_username: process.env.SP_USERNAME,
    sp_password: process.env.SP_PASSWORD,
    sp_prefix: process.env.SP_PREFIX,
    sp_return_url: process.env.SP_RETURN_URL,
  },
};
