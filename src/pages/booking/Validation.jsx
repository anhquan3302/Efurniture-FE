import React from 'react'

export default function Validation(values) {

    const errors ={}

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    // ^ asserts the start of the string.
    // [^\s@]+ matches one or more characters that are not whitespace or '@'. This ensures there are characters before the '@'.
    // @ matches the literal '@' symbol.
    // [^\s@]+ matches one or more characters that are not whitespace or '@'. This ensures there are characters after the '@'.
    // \. matches the literal '.' symbol. It needs to be escaped because '.' in regular expressions matches any character.
    // [^\s@]{2,6} matches between 2 to 6 characters that are not whitespace or '@'. This is usually for the top-level domain like .com, .org, etc.
    // $ asserts the end of the string.

    const phone_pattern = /^\d{10,15}$/;
    // ^: Matches the beginning of the string.
    // \d: Matches any digit (0-9).
    // {10,15}: Matches a range of 10 to 15 repetitions of the previous pattern (digits).
    // $: Matches the end of the string.

    if(values.name === ""){
        errors.name = "Name is Required!";
    }
    if(values.email === ""){
        errors.email = "Email is Required!";
    }
    else if(!email_pattern.test(values.email)){
        errors.email = "Email is not correct"
    }
    if(values.phone === ""){
        errors.phone = "Phone is Required!";
    }
    else if(! phone_pattern .test(values.phone)){
        errors.phone = "Phone is not correct"
    }

    return errors;

}
