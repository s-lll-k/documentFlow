function rot13(str) {
    let solution = "";
    for (let i = 0; i < str.length; i++) {
    let asciiNum = str[i].charCodeAt();
    if (asciiNum >= 65 && asciiNum <= 77) {
        solution += String.fromCharCode(asciiNum + 13);
    } else if (asciiNum >= 78 && asciiNum <= 90) {
        solution += String.fromCharCode(asciiNum - 13);
    } else {
        solution += str[i];
    }
    }
    return solution;
}

console.log(rot13("SERR CVMMN!")); //FREE PIZZA!
