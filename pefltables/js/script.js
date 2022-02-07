function parseExcelTableData(_data) {

    console.log(_data);
    const rows = _data.split(/[\n\r]/)
    // rows.forEach((element, i) => {
    //     console.log(i, element);
    // });

    const _table = rows.map(r => {
        return r.split('\t')
    })

    return _table
}

function formRow(row, rowIndex, _width = 70) {
    const columns = row.length || 5
    const cellWidth = parseFloat(_width / columns).toFixed(0)
    console.log(rowIndex, columns, cellWidth, row);
    return `[tr${rowIndex % 2 ? "" : "  bgcolor=#C9F8B7"}]${row.map((cell, cellIndex) => {

        return formCell(cell, cellIndex, { _width: cellWidth, isBold: rowIndex === 0 })
    }).join("")}[/tr]`
}

function formCell(cell, cellIndex, options = { _width: 10, isBold: false }) {
    const { _width, isBold } = options
    return `[td width=${_width}% align=center]${isBold ? "[b]" : ""}${cell.trim()}${isBold ? "[/b]" : ""}[/td]`
}

function formPeflTable(_rawTable, caption = "Заголовок", width = 70) {

    const _peflTable = `[center]${caption}
    [table cellpadding=2 width=${parseInt(width)}% border=0 cellspacing=3 bgcolor=#A3DE8F]${_rawTable.map((row, rowIndex) => formRow(row, rowIndex)).join("")}[/table][/center]`
    return _peflTable
}
const testButton = document.getElementById("trasform-button")

testButton.addEventListener("click", (e) => {
    const rawText = document.getElementById("raw-input");
    const _table = parseExcelTableData(rawText.value)

    console.log("TABLE  -", _table);

    const result = formPeflTable(_table.filter(row =>row.length>1))
    // const result = formPeflTable(_table.filter(row =>row.length && !row.some(cell => cell.trim() === "")))

    console.log(result);

    document.getElementById("table-output").value = result


})