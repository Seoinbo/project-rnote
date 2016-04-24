export module Config {
    // 서버에서 현재 시간을 받아와 javascript timestamp로 반환한다.
    export function now(nocache: boolean = false): number {
        return new Date().getTime();
    }
}

export module Animation {
    export var intervalTime = 20;
}
