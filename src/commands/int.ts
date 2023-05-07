import { fatumCommandDecorator } from './utils';
import cottus from 'cottus';

const validator = cottus.compile([
    'required', { 'attributes' : {
        'min' : [ 'required', 'integer' ],
        'max' : [ 'required', 'integer' ],
    } }
]);

class Prompt {
    placeHolder= "Please enter number range"
    prompt= "Enter min-max range for Integer"
    defaultValue="1-100"

    validate(value:string):{min:number, max:number}{
        const [min, max] = value.split('-');
        
        const valid = validator.validate({min, max});

        return {min:valid.min, max:valid.max}
    }
}

export default fatumCommandDecorator(
    (fatum, {prompt})=>fatum.int(prompt.min, prompt.max),
    {
        prompt: new Prompt() 
    }
);
