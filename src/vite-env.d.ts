/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NATIVE?: string;
  readonly VITE_AUTH_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
