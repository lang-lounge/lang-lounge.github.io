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
    const eventsBox = document.getElementById("eventsBox");
    const viewType = ["らんらん会", "想創会", "その他イベント"];
    const events = yield getEvents();
    const filtered = events
        .filter(e => viewType.includes(e.type)) //サーバー内イベントだけを表示
        .filter(e => new Date() <= e.date); //今後のイベントだけを表示
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
            : ""}
            </div>
            `;
    }).join("\n");
    eventsBox.innerHTML = html;
}))();
