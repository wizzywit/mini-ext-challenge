import base from "./base";

export interface IResponse {
    class: string,
    students: string[]
}
export const fetchRecord = async (name: string) => {
    return new Promise<IResponse[]>((resolve, reject) => {
        base('Students').select({
            view: "Grid view",
            filterByFormula: `({Name} = '${name}')`,
            fields: ["Classes"]
        }).eachPage(function page(records, fetchNextPage) {
            if(records.length === 0) resolve([])
            const classes = records.length > 0 ? records[0]?.get('Classes') as [] : [];
            Promise.all([...classes.map((cls) => fetchClass(cls))]).then(async (values) => {
                    if(values){
                        Promise.all([...values.map((student) => customPromise(student))]).then(responses => {
                            resolve(responses)
                        }).catch(e => reject(e))
                    }
                }).catch(e => reject(e))

            fetchNextPage();
        })

    })

}

const customPromise = ({name, students}: {name: string, students: string[]}) => {
    return new Promise<{class: string, students: string[]}>((resolve, reject) => {
        Promise.all([...students.map((student) => fetchSingleStudent(student))]).then(responses => {
            resolve ({
                class: name as string,
                students: responses as string[]
            })
        }).catch(reject)
    })
}

const fetchClass = (id: string) => {
    return new Promise<{name: string, students: string[]}>(((resolve, reject) => {
        base('Classes').find(id, function(err, record) {
            if (err) { console.error(err); reject(err); return; }
            if(record){
                resolve( {
                    name: record.fields.Name as string,
                    students: record.fields.Students as string[]
                })
            }
        })
    }))
}


const fetchSingleStudent = (id: string) => {
    return new Promise<string>(((resolve, reject) => {
        base('Students').find(id, function(err, record) {
            if (err) { console.error(err); reject(err); return; }
            if(record){
                resolve(record.fields.Name as string)
            }
        })
    }))
}