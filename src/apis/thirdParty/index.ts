import {http} from "@/utils/http";
import EasyTyper from "easy-typer-js";
// 第三方的api接口
// 一言接口
let myYiYan = import.meta.env.VITE_YIYAN_API
if (!myYiYan) {
    myYiYan = 'https://v1.hitokoto.cn/?c=a&encode=json'
}
// 每日鸡汤
// export const getSoup = () => {
//   return http.request<any>(
//     "get",
//     myYiYan,
//   );
// };
export function getSoup() {
    return http.get(myYiYan)
}
// 打字机-每日鸡汤
export const getSoupTyping = (obj: any) => {
    fetch(myYiYan)
        .then((res) => {
            return res.json();
        })
        .then(({hitokoto}) => {
            new EasyTyper(
                obj,
                hitokoto,
                () => {
                    getSoupTyping(obj)
                },
                () => {
                }
            );
        });
}
