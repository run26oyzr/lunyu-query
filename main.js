const logBox = document.getElementsByClassName('log-box')[0];
const log = (a) => {
    logBox.value += a;
    logBox.scrollTop = logBox.scrollHeight;
}
const clearLog = () =>{
    logBox.value = "";
}
fetch('./config.json')
    .then((response) => response.json())
    .then((json) => {
		tmpall = json.all;
        tmpused = json.used;
		// console.log(tmpall);
        All = tmpall.split(' ');
        Used = tmpused.split(' ');
        // console.log(All);   
	})
fetch('./text.json')
    .then((response) => response.json())
    .then((json) => {
		Text = json;
        // console.log(Text);
        initTable();
	})
const initTable = async () => {
    let result = document.createElement('table');
    result.className = "tc mt";
    result.id = 'res'
    const tbody = "<tbody>";
    const tr = "<tr>";
    const btr = "</tr>";
    const btbody = "</tbody>";
    const td = "<td>";
    const btd = "</td>";
    const nothing = "-";
    let insideHtml = tbody;
    console.log(All);
    for (let i = 0; i < 58; i++) {
        let id = All[i];
        let flag = false;
        for (let j = 0; j < 58; j++) if (Used[j] == id) flag = true;
        if (!flag){
            insideHtml += tr + td + id + btd + td + Text[id] + btd + btr;
        }
    }
    result.innerHTML = insideHtml;
    node = document.getElementById('tb');
    node.parentNode.insertBefore(result, node);
    node.remove();
}
const changeTable = async (a, b) => {
    let result = document.getElementById('res');
	const tbody = "<tbody>";
    const tr = "<tr>";
    const btr = "</tr>";
	const btbody = "</tbody>";
	const td = "<td>";
	const ztd = '<td class="zz">';
	const btd = "</td>";
	const nothing = "-";
    const p = "<p>"
    const bp = "</p>"
	insideHtml = tbody + "<br>" + tr + td + a + btd + td + b + btd + btr + btbody;
    // console.log(b);
    // insideHtml = p + b + bp;
	result.innerHTML = insideHtml;
    // for (let _ = 0; _ < 7; _++) {
    //     insideHtml += tr;
    //     for (let __ = 0; __ < 7; __++) {
    //         insideHtml += td + nothing + btd;
    //     }
    //     insideHtml += btr;
    // }
}
document.getElementById('query').addEventListener('click', () => {
    clearLog();
    try{
        var id = document.getElementById('id').value;
        var flag1 = false, flag2 = false;
        for (let i = 0; i < 58; i++){
            if (All[i] == id) flag1 = true;
        }
        for (let i = 0; i < 58; i++){
            if (Used[i] == id) flag2 = true;
        }
        if (!flag1)
            log("输入格式错误或该篇目未在领读范围内");
        else if(!flag2){
            changeTable(id, Text[id]);
            // console.log(Text[id]);
            log("查询成功");
        }
        else
            log("该篇目已经被讲过");
    }catch{
        log("输入格式错误");
    }
})


// 根据文本生成text.json
// document.getElementById('query').addEventListener('click', () => {
//     tmptext = document.getElementById('spl').value;
//     console.log(tmptext);
//     tmp2 = tmptext.split('\n');
//     console.log(tmp2);
//     let cnt = -1;
//     Text = new Array();
//     for (let i = 0; i < 95; i++){
//         let tmp = tmp2[i].toString();
//         console.log(tmp);
//         if (tmp[0] < '0' || tmp[0] > '9'){
//             Text[cnt] += "<br>";
//             Text[cnt] += tmp2[i];
//         }
//         else{
//             cnt++;
//             Text[cnt] = "";
//             for (let j = 0; j < tmp.length; j++){
//                 if (tmp[j] != '.' && (tmp[j] < '0' || tmp[j] > '9') && tmp[j] != ' ')
//                     Text[cnt] += tmp[j];
//             }
//         }
//     }
//     console.log(Text);
//     for (let i = 0; i < 58; i++){
//         log("\"");
//         log(All[i]);
//         log("\": \"");
//         log(Text[i]);
//         log("\",");
//         log('\n');
//     }
// })