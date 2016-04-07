export module Config {
    // 서버에서 현재 시간을 받아온다.
    export function now(nocache: boolean = false): number {
        return new Date().getTime();
    }
}
