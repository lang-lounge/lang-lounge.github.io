var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getEvents, sortEvents } from "./getEvents.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const comingBox = document.getElementById("comingEventsBox");
    const pastBox = document.getElementById("pastEventsBox");
    const events = yield getEvents();
    const filtered = events.filter(e => e.type == "らんらん会"); //らんらん会だけを表示
    const comingEvents = [];
    const pastEvents = [];
    filtered.forEach(e => {
        if (new Date() <= e.date) {
            comingEvents.push(e);
        }
        else {
            pastEvents.push(e);
        }
    });
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
            : ""}
            </div>
            `;
    }).join("\n"));
    comingBox.innerHTML = coming;
    pastBox.innerHTML = past;
}))();
