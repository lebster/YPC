import React from "react"
import { calculateWeeklyTotal } from "../util/calculations"
import {useStaticQuery, graphql} from "gatsby"


const JSONbuildtime = () => {

    const PLAYERDATA = useStaticQuery(
            graphql`query query {
            allParsedJson{
                    nodes {
                        Name
                        Profit
                        GameDate
                    }
            }
        }
    `)

    const JSONData = calculateWeeklyTotal(PLAYERDATA.allParsedJson.nodes);

   return <div style={{ maxWidth: `960px`, margin: `1.45rem` }}>
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
}
export default JSONbuildtime