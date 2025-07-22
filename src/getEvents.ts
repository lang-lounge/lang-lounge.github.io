export type Event = {
    name: string,
    type: string,
    date: Date,
    desc: string
}

const url = "https://docs.google.com/spreadsheets/d/1CuZSGGJnNKkaYBUB5hZlNIGjK44aidGBHFaQzfRf_6s/gviz/tq?tqx=out:csv" //読み込むスプレッドシート

export const getEvents = async () => {
    const response = await fetch(url)
    const content = await response.text()

    const data: Event[] = content.split("\n").slice(1) //改行で分割、見出し1行を削除
        .map(r => {
            const cells = r.split(",")
                .map(d => d.slice(1, -1)) //データを囲む引用符を削除

            return { //データ整形
                name: cells[0],
                type: cells[1],
                date: new Date(cells[2]),
                desc: cells[3],
            }
        })

    return data
}

export const sortEvents = (events: Event[], reverse = false) => {
    return events.sort((a, b) => {
        const aDate = a.date.getTime()
        const bDate = b.date.getTime()
        return reverse
            ? bDate - aDate
            : aDate - bDate
    })
}