import dotenv from 'dotenv'

export class EnvReader {

      get(Key: string): string {
        dotenv.config();
        const value = process.env[Key]?.trim();
        if (!value) {
            throw new Error(`Environment variable '${Key}' is not defined`);
        }
        return value;
    }
}