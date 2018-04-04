import r from './RegExp'
for (var key in r) {
    let p = r[key];
    test(p.desc, () => {
        if (p.pattern) {
            let str_a = "";
            for (var i = 0; i < p.allows.length; i++) {
                str_a += !(p.allows[i].match(p.pattern))
                    ? p.allows[i]
                    : "";
                if (!p.allows[i].match(p.pattern)) {
                    console.log(`
${p.desc}
允许字符串不合法 `, `\x1B[36m${p.allows[i]}`);
                }
            }
            let str_n = "";
            for (var j = 0; j < p.notallows.length; j++) {
                str_n += p.notallows[j].match(p.pattern)
                    ? p.notallows[j]
                    : "";
                if (p.notallows[j].match(p.pattern)) {
                    console.log(`
${p.desc}
不允许字符串合法 `, `\x1B[36m${p.notallows[j]}`);
                }
            }
            expect(str_a + str_n).toBeFalsy();
        }
        if (p.validator) {
            let str_a = ""
            for (var i = 0; i < p.allows.length; i++) {
                p.validator(p.allows[i].vue)(null, p.allows[i].value, (str) => {
                    str_a += str
                        ? str
                        : "";
                    if (str) {
                        console.log(`
${p.desc}
允许字符串不合法 `, `\x1B[36m${p.allows[i].value}`);
                    }
                })
            }
            let str_n = "";
            for (var j = 0; j < p.notallows.length; j++) {
                p.validator(p.notallows[j].vue)(null, p.notallows[j].value, (str) => {
                    str_n += (!str)
                        ? str
                        : "";
                    if (!str) {
                        console.log(`
${p.desc}
不允许字符串合法 `, `\x1B[36m${p.notallows[j].value}`);
                    }
                })
            }
            expect(str_a + str_n).toBeFalsy();
        }
    });
}
console.log(`\x1B[36m详细信息---------------------------------------------------------------`);
