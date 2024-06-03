import { useQuery } from '@apollo/client'
import { SPA } from '../graphql/queries/spa'

const About = () => {
  const { data } = useQuery(SPA)
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
