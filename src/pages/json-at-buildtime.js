import React from "react"
import PLAYERDATA from "../../content/parsed.json"
import { calculateWeeklyTotal } from "../util/calculations"

const JSONData = calculateWeeklyTotal(PLAYERDATA);
console.log(JSONData);

const JSONbuildtime = () => (

    <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
        <h1>Totals</h1>
        <ul>
            {JSONData.map((data, index) => {
                return <li key={`content_item_${index}`}>
                    <div>
                        <div>
                            {data.Name}
                        </div>
                        <div>
                            {data.Profit}
                        </div>
                    </div>
                </li>
            })}
        </ul>
    </div>
)
export default JSONbuildtime