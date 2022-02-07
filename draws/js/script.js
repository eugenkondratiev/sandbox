function parseExcelTableData(_data) {

    // console.log("_data - ", _data);
    const rows = _data.split(/[\n\r]/)
    // rows.forEach((element, i) => {
    //     console.log(i, element);
    // });

    const _table = rows.map(r => {
        return r.split('\t').map(_=>_.trim())
    })

    return _table.filter((row, rowIndex) => {
        return Array.isArray(row) && !row.some(teamName => teamName.trim() === '')
    })
}


function formGroups(_table) {

    // console.log("_table - ", _table);
    const groups = _table[0].map(_ => [])

    _table.forEach((row, rawIndex) => {
        row.forEach((team, index) => {
            groups[index].push(team)
        })
    })

    // console.log("groups  - ", groups);

    return groups
}

function formMainCalendar(groups) {
    return groups.map(gr => {
        return formCalendar(gr)
    })
}


function formCalendar(tournament) {
    if (!tournament || !Array.isArray(tournament)) return null

    let teamslist = [...tournament]

    if ((teamslist.length % 2)) teamslist.push(null)

    console.log("teamsList - ", teamslist);

    const calendar = teamslist.map((_, index) => {
        return { name: `Тур ${index + 1}`, games: [] }
    })

    const N = teamslist.length;
    const shift = N / 2;
    // console.log("N, shift, N - 1    - ", N, shift, N - 1);

    function formTourGames(_list, _shift, _tour, _type = 0) {
        const _games = []
        for (let i = 0; i < _shift; i++) {
            _games.push([_list[i], _list[i + _shift], _type]);
        }

        // console.log("Tour ", _tour + 1, _games);
        return _games
    }


    for (let tour = 0; tour < N - 1; tour++) {
        calendar[tour].games = formTourGames(teamslist, shift, tour)

        //now carousel all except first element
        const secondHalf = teamslist.splice(shift);

        const [first, ...rest] = teamslist
        // console.log(" ====  split ", first, rest);
        const last = rest.pop();
        secondHalf.push(last)
        const middle = secondHalf.shift()
        rest.unshift(middle)
        // console.log(" ====  shifted teams", first, rest);

        teamslist = [first, ...rest, ...secondHalf]
        // console.log("newteamslist  -" , newteamslist);
    }

    calendar.pop()

    console.log("calendar  - ", calendar);
    return calendar

}

function transformCalendarToFixtures(calendar) {
    const tours = calendar[0].length


    const fixtures = [...Array(tours)].map((_, i) => [`Тур ${i + 1}\n\r`])

    console.log("initial fixtures", fixtures);

    calendar.forEach((gr, grIndex) => {
        gr.forEach((tour, tourIndex) => {
            fixtures[tourIndex].push(tour.games.join('\n')+'\n')
        })
    })
    console.log("fixtures - ", fixtures);

    return fixtures.reduce((acc, fixturesTour, i)=>{

        console.log("fixturesTour -", fixturesTour);
        return acc + `\n\r${fixturesTour.join('')}`
    },"\n\r")
}

function showGroups(_groups) {
    return _groups.map((gr,i )=> `Группа ${i+1}  - ${gr.join(' ')}\n`).join('')
}
const _rawData = document.getElementById("raw-input")
const _outputData = document.getElementById("fixtures-output")
let mainCalendar
let groupsArray
let fixturesList 

document.getElementById("trasform-button").addEventListener('click', (e) => {
    groupsArray = formGroups(parseExcelTableData(_rawData.value))
    _outputData.value = showGroups(groupsArray)


    mainCalendar = formMainCalendar(groupsArray)
    console.log("### -mainCalendar - ", mainCalendar);
    fixturesList = transformCalendarToFixtures(mainCalendar)
    console.log("FiXTURES LIST - ", fixturesList);

    _outputData.value = _outputData.value + '\n\r' + fixturesList
})