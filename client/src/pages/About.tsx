import { useQuery } from '@apollo/client'
import { SPA } from '../graphql/queries/spa'

const About = () => {
  const { data } = useQuery(SPA)
  console.log(data?.getSPA)
  if (data)
    return (
      <div
        className="px-56"
        dangerouslySetInnerHTML={{ __html: data.getSPA }}
      />
    )
  return <div>Incomming</div>
}

export default About
