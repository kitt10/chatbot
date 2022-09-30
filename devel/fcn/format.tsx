
export const rKey = () => {
    return (Math.random() + 1).toString(36).substring(7)
}

export const zfill = (num: number, size: number) => {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}

export const round2 = (val: number) => {
    return Math.round(val * 100) / 100
}

export const round4 = (val: number) => {
    return Math.round(val * 10000) / 10000
}

export const mean = (a: number[]) => {
    const sum = a.reduce((x, y) => x + y, 0)
    return (sum / a.length) || -1
}

export const toClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then().catch(e => console.error(e))
}
