import React from 'react';
import { useState } from 'react';
import { interpreter , unParse} from '@pounce-lang/core';
import './App.css';
import nextId from './nextId';

type PounceCatPropsType = { pounceCode: string; preCode: string; }; // | number | readonly string[] | undefined

const PounceCat = (props: PounceCatPropsType) => {
  const [src, setSrc] = useState(props.pounceCode);
  const [dlId] = useState(nextId("pounceCatDatalist"));
  const cat = interpreter(`${props.preCode ?? ''} ${src}`);
  const result = runPounce(cat);
  return (
    <div>
      running:<br/> <div className="prog">{inputPounce(src, setSrc, dlId)}</div>
      <datalist id={dlId}>
        <option value={props.pounceCode} label="(original code example)" ></option>
      </datalist>

      yields:<br/>  <div  style={{width:'95.5%', backgroundColor: "rgb(229 206 39)", padding: "2px 2px 2px 8px"}}><code className="stack" >{unParse(result.value.stack)}</code>
      </div>
      <br/>
    </div>
  );
};

const lineCount = (s: string) => {
  return s.split("\n").length;
};

const inputPounce = (src, setSrc, dlId) => {
  return (<textarea
    className="pounceCat-input"
     wrap="true" value={src} 
     rows={lineCount(src)}
     onChange={(e)=>setSrc(e.target.value)} 
     spellCheck="false" 
     ></textarea>);
}

const runPounce = (cat) => {
  try {
    return cat.next();
  }
  catch(e) {
    return ({error: true, value: {stack: ["Exception: Unable to run Pounce code."]}});
  }
};

export default PounceCat;