let isInclude : boolean = true;
let emit : boolean = true;
let emit1 : boolean = true;

enum Gender{
    Male = 0,
    Female = 1
}

let i: {name: string, gender: Gender};

i = {
    name: "ymr",
    gender: Gender.Female
}

console.log(i.gender === Gender.Female)

function myfunction(a:string, b = "1"){

}