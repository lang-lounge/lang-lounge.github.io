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
let events = [];
const now = new Date();
const firstDay = new Date(now.getFullYear(), now.getMonth(), 1); //月の初めの日
const updateCalendar = () => {
    const calendar = document.getElementById("calendar");
    const eventsBox = document.getElementById("eventsBox");
    const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0); //最後の日（次の月の0日）
    const weeks = ["日", "月", "火", "水", "木", "金", "土"];
    const filtered = events
        .filter(e => //その月のイベントだけを表示
     e.date.getFullYear() == firstDay.getFullYear() &&
        e.date.getMonth() == firstDay.getMonth());
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
    const firstDayOfWeek = firstDay.getDay(); //月の初めの曜日
    const lastDayOfWeek = lastDay.getDay(); //月の終わりの曜日
    const days = [
        ...Array(firstDayOfWeek).fill("").map(_ => { return { date: "", event: [] }; }),
        ...Array(lastDay.getDate()).fill("").map((_, idx) => {
            return {
                date: idx + 1,
                event: filtered.filter(e => e.date.getDate() == idx + 1) //その日に存在するイベントを格納
            };
        }),
        ...Array(6 - lastDayOfWeek).fill("").map(_ => { return { date: "", event: [] }; }), //次の月の部分を空白で埋める
    ];
    let calendarHTML = "";
    let weekBucket = []; //週ごとに纏める
    days.forEach(d => {
        weekBucket.push(`
        <td>
            ${d.date}
            <div class="markRow">
                ${d.event.map(e => `<span class="mark" data-type="${e.type}"></span>`).join("")}
            </div>
        </td>
        `); //htmlを作る
        if (weekBucket.length >= weeks.length) { //7個集まったら纏める
            calendarHTML += `<tr>${weekBucket.join("\n")}</tr>`;
            weekBucket = [];
        }
    });
    const weeksHTML = weeks.map(d => `<th>${d}</th>`).join("");
    const month = `${firstDay.getFullYear()}/${("0" + (firstDay.getMonth() + 1)).slice(-2)}`; //月はゼロ埋めしてから表示
    const monthView = document.getElementById("monthView");
    const preButton = document.getElementById("preButton");
    const nextButton = document.getElementById("nextButton");
    calendar.innerHTML = `
    <table>
        <thead>${weeksHTML}</thead>
        <tbody>${calendarHTML}</tbody>
    </table>`;
    monthView.innerHTML = month; //月を表示させる
    preButton.addEventListener("click", preMonth); //ボタンがクリックされた時に関数が実行されるようにする
    nextButton.addEventListener("click", nextMonth);
};
const preMonth = () => {
    firstDay.setMonth(firstDay.getMonth() - 1);
    updateCalendar();
};
const nextMonth = () => {
    firstDay.setMonth(firstDay.getMonth() + 1);
    updateCalendar();
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    events = yield getEvents();
    updateCalendar();
}))();
