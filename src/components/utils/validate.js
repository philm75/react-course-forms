export const validate = (element) => {
    let error = [true, ''];
    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message] : error; 
    }

    if (element.validation.minNum) {
        console.log(parseInt(element.value.trim()));

        const valid = parseInt(element.value.trim()) >= element.validation.minNum;
        const message = `${!valid ? `I am sorry, the minimum is ${element.validation.minNum}` : ''}`;
        error = !valid ? [valid, message] : error; 
    }

    return error;
}