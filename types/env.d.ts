declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Existing environment variables
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_ROLE_KEY: string;

      // Email.js environment variables
      EMAILJS_PUBLIC_KEY: string;
      EMAILJS_PRIVATE_KEY: string;
      EMAILJS_SERVICE_ID: string;
      EMAILJS_TEMPLATE_ID: string;
    }
  }
}

export {};
