export module Config {
    // 서버에서 현재 시간을 받아온다.
    export function now(): number {
        return new Date().getTime();
    }
}

export module DBConfig {
    export const VERSION = 1;
    export const DB_RNOTE = 'rnote';
    export const STORE_RECIPES = 'recipes';
    
}
