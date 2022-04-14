var isInclude = true;
var emit = true;
var emit1 = true;
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
console.log(Gender)
var i;
i = {
    name: "ymr",
    gender: Gender.Female
};
console.log(i.gender === Gender.Female);

