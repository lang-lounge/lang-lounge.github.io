import { getEvents, sortEvents } from "./getEvents.js";

(async () => {
    const eventsBox = document.getElementById("eventsBox")
    const viewType = ["らんらん会", "想創会", "その他イベント"]

    const events = await getEvents()
    const filtered = events
        .filter(e => viewType.includes(e.type)) //サーバー内イベントだけを表示
        .filter(e => new Date() <= e.date) //今後のイベントだけを表示

    const html = sortEvents(filtered).map(event => {
            return `
            <div class="event">
                <div class="eventInfo">
                    <div class="eventTags">
                        <span data-type="${event.type}">${event.type}</span>
                    </div>
                    <div class="dateView">
                        <i class="fa-solid fa-calendar-days"></i>
                        <span>${event.date.toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="eventTitle">${event.name}</div>
                ${event.desc //descがあるときのみ要素を作成
                    ? `<div class="eventDesc">${event.desc}</div>`
                    : ""
                }
            </div>
            `
        }).join("\n")

    eventsBox!.innerHTML = html
})()