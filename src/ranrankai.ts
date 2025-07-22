import { getEvents, sortEvents, Event } from "./getEvents.js";

(async () => {
    const comingBox = document.getElementById("comingEventsBox")
    const pastBox = document.getElementById("pastEventsBox")

    const events = await getEvents()
    const filtered = events.filter(e => e.type == "らんらん会") //らんらん会だけを表示

    const comingEvents: Event[] = []
    const pastEvents: Event[] = []
    filtered.forEach(e => { //未来のイベントと過去のイベントに分ける
        if (new Date() <= e.date) {
            comingEvents.push(e)
        } else {
            pastEvents.push(e)
        }
    })

    const [coming, past] = [sortEvents(comingEvents), sortEvents(pastEvents, true)] //未来のイベントは時系列順、過去のイベントは逆順に整列
        .map(l => l.map(event => {
            return `
            <div class="event">
                <div class="eventInfo">
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
        }).join("\n"))

    comingBox!.innerHTML = coming
    pastBox!.innerHTML = past
})()