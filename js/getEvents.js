var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://docs.google.com/spreadsheets/d/1CuZSGGJnNKkaYBUB5hZlNIGjK44aidGBHFaQzfRf_6s/gviz/tq?tqx=out:csv"; //読み込むスプレッドシート
export const getEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url);
    const content = yield response.text();
    const data = content.split("\n").slice(1) //改行で分割、見出し1行を削除
        .map(r => {
        const cells = r.split(",")
            .map(d => d.slice(1, -1)); //データを囲む引用符を削除
        return {
            name: cells[0],
            type: cells[1],
            date: new Date(cells[2]),
            desc: cells[3],
        };
    });
    return data;
});
export const sortEvents = (events, reverse = false) => {
    return events.sort((a, b) => {
        const aDate = a.date.getTime();
        const bDate = b.date.getTime();
        return reverse
            ? bDate - aDate
            : aDate - bDate;
    });
};
