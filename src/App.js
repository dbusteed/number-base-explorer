import React, { useState, useEffect } from 'react'
import './App.css'
import CharacterBox from './components/characterBox'
import BaseXConverter from './BaseXConverter'

export default function App() {

  const [value, setValue] = useState(0)
  const [displayValue, setDisplayValue] = useState('0000')
  const [converter, setConverter] = useState(new BaseXConverter('0123456789'))
  const [customSet, setCustomSet] = useState('')
  const [step, setStep] = useState(1)
  
  const [allConverters, setAllConverters] = useState({
    2: ["Base 2 (binary)", '01'],
    8: ["Base 8 (octal)", '01234567'],
    10: ["Base 10 (decimal)", '0123456789'],
    16: ["Base 16 (hex)", '0123456789ABCDEF']
  })

  const changeConverter = (base) => {
    if (base) {
      setConverter(new BaseXConverter(allConverters[base][1]))
    } else {
      if (customSet) {
        setConverter(new BaseXConverter(customSet))
      } else {
        alert('enter a custom set, then select the radio button')
      }
    }
  }

  useEffect(() => {
    let convertedValue = converter.convert(value)
    if (convertedValue.length < 5) {
      setDisplayValue((converter.alphabet[0].repeat(4 - convertedValue.length)) + convertedValue.toString())
    } else {
      setDisplayValue(convertedValue)
    }
    
  }, [value, converter])

  return (
    <div id="main-container">
      
      <div id="base-selector">
        <h2>select a number base...</h2>

        {
          Object.entries(allConverters).map(([key, value]) => (
            <div key={key} className="radio-thing">
              {
                converter.alphabet === value[1]
                ? <><input type="radio" name="base" onChange={() => changeConverter(key)} checked/> {value[0]}</>
                : <><input type="radio" name="base" onChange={() => changeConverter(key)} /> {value[0]}</>
              }
            </div>
          ))
        }

        <div id="add-base-container">
          
          <input type="text" placeholder="custom base" value={customSet} onChange={(e) => setCustomSet(e.currentTarget.value)} />
          <button onClick={() => {
            let set = [...new Set(customSet.split(''))].join('')
            let newConv = {}
            newConv[set] = [set, set]
            setAllConverters({...allConverters, ...newConv})
            setCustomSet('')
          }}>add</button>       
        
        </div>

      </div>

      <div id="controller">

        <h2>use buttons to play with your number</h2>

        <div id="character-box-container">
          {
            displayValue.split('').map((char, idx) => (
              <CharacterBox key={idx} char={char} position={`${converter.base**(displayValue.length-(idx+1))}`}/>
            ))
          }
        </div>
        
        <div id="button-container">
          <button onClick={() => setValue(value + Number(step))}>+ {step}</button>
          <button onClick={() => setValue((value - Number(step)) < 0 ? 0 : value - Number(step))} disabled={value <= 0}>- {step}</button>
          <select onChange={(e) => setStep(e.currentTarget.value)}>
            <option>1</option>
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>

        <i>decimal value: {value}</i>
      </div>

    </div>
  )
}