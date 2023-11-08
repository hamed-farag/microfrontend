import { sum } from "@demo/helpers";

import { Button } from "@demo/components"

export default function Root(props) {
  return <section>{props.name} is mounted!
    <p>{sum(1, 2)}</p>
    <Button value={`Button From ${props.name}`} />
  </section>;
}
