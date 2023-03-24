/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly HS_PATH_SERVER_API: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}