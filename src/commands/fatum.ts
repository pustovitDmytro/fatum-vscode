import fatum from 'fatum';
import cottus from 'cottus';
import { CommandDecorator } from './utils';

class Prompt {
    validator: any;

    validate(value:string):any {
        const extracted = this.extract(value);

        return this.validator.validate(extracted);
    }
    extract(value: string):any {
        return value;
    }
}

class RangePrompt extends Prompt {
    placeHolder = 'Please enter range';
    prompt = 'Enter min-max range for generation';
    defaultValue = '1-100';

    extract(value: string) {
        const [ min, max ] = value.split('-');

        return { min, max };
    }
}

class IntPrompt extends RangePrompt {
    validator = cottus.compile([
        'required', { 'attributes' : {
            'min' : [ 'required', 'integer' ],
            'max' : [ 'required', 'integer' ]
        } }
    ]);
}

class FloatPrompt extends RangePrompt {
    validator = cottus.compile([
        'required', { 'attributes' : {
            'min' : [ 'required', 'number' ],
            'max' : [ 'required', 'number' ]
        } }
    ]);
}

const commands = [
    { id: 'fatum.domain', generate: () => fatum.domain() },
    { id: 'fatum.email', generate: () => fatum.email() },
    { id: 'fatum.firstName', generate: () => fatum.firstName() },
    { id: 'fatum.fullName', generate: () => fatum.fullName() },
    { id: 'fatum.int', generate: (p:any) => fatum.int(p.min, p.max), prompt: new IntPrompt() },
    { id: 'fatum.lastName', generate: () => fatum.lastName() },
    { id: 'fatum.nickName', generate: () => fatum.nickName() },
    { id: 'fatum.password', generate: () => fatum.password() },
    { id: 'fatum.sentence', generate: () => fatum.sentence() },
    { id: 'fatum.text', generate: () => fatum.text() },
    { id: 'fatum.uniform', generate: (p:any) => fatum.uniform(p.min, p.max), prompt: new FloatPrompt() },
    { id: 'fatum.uuid', generate: () => fatum.uuid() }
];

export default commands.map(c => ({
    id      : c.id,
    handler : CommandDecorator(
        c.generate,
        { prompt: c.prompt }
    )
}));
