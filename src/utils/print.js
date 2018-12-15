/**
 * 浏览器打印
 */

export function printHtmlInner(printTable) {
	let newWindow = window.open("_blank");   //打开新窗口
	let prnhtml = printTable.innerHTML
	newWindow.document.write(prnhtml);   //向文档写入HTML表达式或者JavaScript代码
    newWindow.document.close();     //关闭document的输出流, 显示选定的数据
    newWindow.print();
}

export function printHtmlOuter(printTable) {
	let newWindow = window.open("_blank");   //打开新窗口
	let prnhtml = printTable.outerHTML
	newWindow.document.write(prnhtml);   //向文档写入HTML表达式或者JavaScript代码
    newWindow.document.close();     //关闭document的输出流, 显示选定的数据
    newWindow.print();
}
