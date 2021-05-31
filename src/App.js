import React, {useState} from 'react';
import './App.css';
import data from './data/1918_2019election_results.json';
import Line from './Components/Line';
import Pie from './Components/Pie';
import BarPerc from './Components/BarPerc';
import YearPicker from "./Components/YearPicker";

function App() {
  const byKey = (key) => data.reduce((output, row) => {
    let ix = output.findIndex((outRow) => outRow[key] === row[key]);
    if (ix === -1) {
      const value = {
        [key]: row[key],
        data: []
      }

      output.push(value);
      ix = output.length - 1;
    }

    output[ix].data.push(row);

    return output;
  }, []);

  const byElection = byKey('election');
  const processed = byElection.map(({election, data}) => {
    let runningTurnout = 0;
    let i = 1;
    return {
      election,
      data: data.reduce((output, input, ix) => {
        if(input.turnout === 'NA') {
          return output;
        }
        ['con_votes', 'lab_votes', 'lib_votes', 'oth_votes', 'total_votes'].forEach((key) => {
          output[key] = (parseInt(output[key], 10) || 0) + (parseInt(input[key], 10) || 0);
        });
        runningTurnout += parseFloat(input.turnout) || 0;
        output.turnout = (runningTurnout / i++);
        output.electorate = Math.floor(output.total_votes / output.turnout);
        output.non_voters =  output.electorate - output.total_votes;

        return output;
      }, {})
    }
  })

  const years = processed.map(row => row.election);

  const [year, setYear] = useState(years[years.length - 1]);

  return (
    <div className="App">
      <div style={{ height: '40vh'}}>
        <Line data={processed} />
      </div>
      <div>
        <YearPicker year={year} years={years} setYear={setYear} />
      </div>
      <div style={{height: '40vh', display: 'flex'}}>
          <Pie style={{width: '50%'}} year={year} data={processed} />
          <BarPerc style={{width: '50%'}} year={year} data={processed} />
      </div>
    </div>
  );
}

export default App;
